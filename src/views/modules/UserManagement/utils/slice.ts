import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../../store/api";
import { AppThunk, RootState } from "../../../../store/app";
import {
  GridOptions,
  GridReadyEvent,
  IServerSideGetRowsParams,
} from "ag-grid-community";
import Config, { getServerListPayload } from "../../../../config/Config";
import { API_URL } from "./apiUrls";

interface InitialState {
  isLoading: boolean;
  agGrid: any;
  perPage: any;
  details: any;
}

const initialState = {
  isLoading: false,
  agGrid: null,
  perPage: Config.grid.server.gridOptions?.paginationPageSize,
  details: null,
} as InitialState;

const userSlice = createSlice({
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
      state.agGrid = action?.payload;
    },
    setPerPage: (state, action: PayloadAction<any>) => {
      state.perPage = action?.payload;
      if (state.agGrid) {
        state.agGrid.api.paginationSetPageSize(Number(state.perPage));
        state.agGrid.api.setCacheBlockSize(state.perPage);
      }
    },
    setDetails: (state, action: PayloadAction<any>) => {
      state.details = action?.payload;
    },
  },
});

export const { start, success, failure, setGrid, setPerPage, setDetails } =
  userSlice.actions;

/** For Listing:Start */
const fetchList = async (payload?: any): Promise<any> => {
  return await api
    .post(API_URL.LIST, payload)
    .then(({ data }) => {
      return data;
    })
    .catch(error => error);
};

export const setPerPageSize =
  (size: number): AppThunk<any> =>
  async (dispatch, getState: () => RootState) => {
    dispatch(setPerPage(size));
    dispatch(setupGrid(getState().user.agGrid));
  };

export const setupGrid =
  (params: GridReadyEvent): AppThunk<any> =>
  async (dispatch, getState: () => RootState) => {
    try {
      dispatch(setGrid(params));
      const dataSource = await createDataSource(
        getState,
        Config.grid.server.gridOptions
      );
      params.api.setServerSideDatasource(dataSource);
    } catch (error: any) {
      //
    }
  };

const changeFilterAndSort = (params: any) => {
  params;
  // if (params.filterModel && params.filterModel["is_active"]) {
  // 	params.filterModel["is_active"].values = convertTextToID(
  // 		params.filterModel["is_active"],
  // 		this.commonStore.statusFilter
  // 	);
  // }
};

const createDataSource = (
  getState: () => RootState,
  gridOptions?: GridOptions
) => {
  return {
    gridOptions,
    getRows: (params: IServerSideGetRowsParams) => {
      changeFilterAndSort(params.request);
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

/** For Listing:End */

export const createRecord =
  (action: any): AppThunk<any> =>
  async (dispatch, getState) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.CREATE, action);
      dispatch(setupGrid(getState().user.agGrid));
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure(error.data));
      return Promise.reject(error.data);
    }
  };

export const updateRecord =
  (id: number, action: any): AppThunk<any> =>
  async (dispatch, getState) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.UPDATE(id), action);
      dispatch(setupGrid(getState().user.agGrid));
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure(error.data));
      return Promise.reject(error.data);
    }
  };

export const deleteRecord =
  (id: number, action: any): AppThunk<any> =>
  async (dispatch, getState) => {
    try {
      dispatch(start());
      const response = await api.delete(API_URL.DELETE(id), action);
      dispatch(setupGrid(getState().user.agGrid));
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure(error.data));
      return Promise.reject(error.data);
    }
  };

export const details =
  (id: number): AppThunk<any> =>
  async dispatch => {
    try {
      const response = await api.get(API_URL.DETAILS(id));
      dispatch(setDetails(response.data.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      return Promise.reject(error.data);
    }
  };

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

const userReducer = userSlice.reducer;
export default userReducer;
