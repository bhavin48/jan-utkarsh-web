import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../../store/api";
import { AppThunk, RootState } from "../../../../store/app";
import {
  GridOptions,
  GridReadyEvent,
  IServerSideGetRowsParams,
} from "ag-grid-community";

import { API_URL } from "./apiUrlB";
import { getServerListPayload } from "../../../../config/Config";
// import { error } from "console";
interface InitialState {
  isLoading: boolean;
  agGrid: any;
  perPage: any;
  details: any;
}

const initialState = {
  isLoading: false,
  agGrid: null,
  details: null,
} as InitialState;

const buserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    start: state => {
      state.isLoading = true;
    },
    success: state => {
      state.isLoading = false;
    },
    failure: state => {
      state.isLoading = false;
    },
    setGrid: (state, action: PayloadAction<any>) => {
      state.agGrid = action.payload
    },

    setDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload
    }
  }
})

export const { start, success, failure, setGrid, setDetails } = buserSlice.actions



const createDataSource = (
  getState: () => RootState,
  gridOptions?: GridOptions
) => {
  return {
    gridOptions,
    getRows: (params: IServerSideGetRowsParams) => {
      // changeFilterAndSort(params.request);
      const payload = getServerListPayload(params);
      fetchList(payload).then(data => {
        params.success({ rowData: data?.rows, rowCount: data?.count });
        if (data.count <= 0) {
          params.api.showNoRowsOverlay();
        } else {
          params.api.hideOverlay();
        }
      });
    },
  };
};

export const setupGrid =
  (params: GridReadyEvent): AppThunk<any> =>
    async (dispatch, getState: () => RootState) => {
      try {
        dispatch(setGrid(params));
        const dataSource = await createDataSource(
          getState,
          // Config.grid.server.gridOptions
        );
        params.api.setServerSideDatasource(dataSource);
      } catch (error: any) {
        //
      }
    };
const fetchList = async (payload?: any): Promise<any> => {

  return await api.post(API_URL.LIST, payload)
    .then(({ data }) => {
      return data

    }).catch(error => error)
}

export const createRecord = (action: any): AppThunk<any> =>
  async (dispatch, getState) => {
    try {
      dispatch(start())

      const response = await api.post(API_URL.CREATE , action)
      dispatch(setupGrid(getState().user.agGrid))
      dispatch(success(response.data));
      return Promise.resolve(response.data)
    } catch (error: any) {
      dispatch(failure(error.data))
      return Promise.reject(error.data)
    }
  }

  export const deleteRecord = (id: number, action: any): AppThunk<any> => 
  async (dispatch, getState) =>{
    try{
      dispatch(start());
      const response = await api.delete(API_URL.DELETE(id), action);
      dispatch(setupGrid(getState().user.agGrid));
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    }catch(error : any){
      dispatch(failure(error.data));
      return Promise.reject(error.data);
    }
  }

  export const changeStatus =
  (id: number, status: number): AppThunk<any> =>
  async (dispatch, getState) => {
    try {
      const response = await api.post(API_URL.CHANGE_STATUS(id), { status });
      dispatch(setupGrid(getState().user.agGrid));
      return Promise.resolve(response.data);
    } catch (error: any) {
      return Promise.reject(error.data);
    }
  };


const buserReducer = buserSlice.reducer

export default buserReducer