import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../../store/api";
import { AppThunk } from "../../../../store/app";
import Config from "../../../../config/Config";
import { API_URL } from "./apiUrls";

interface InitialState {
  isLoading: boolean;
  agGrid: any;
  rowData: any;
  perPage: any;
  details: any;
}

const initialState = {
  isLoading: false,
  agGrid: null,
  rowData: null,
  perPage: Config.grid.server.gridOptions?.paginationPageSize,
  details: null,
} as InitialState;

const roleSlice = createSlice({
  name: "role",
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
    setRowData: (state, action: PayloadAction<any>) => {
      state.rowData = action?.payload;
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

export const {
  start,
  success,
  failure,
  setRowData,
  setGrid,
  setPerPage,
  setDetails,
} = roleSlice.actions;

/** For Listing:Start */
export const fetchList =
  (action?: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      dispatch(setRowData([]));
      const response = await api.post(API_URL.LIST, action);
      dispatch(setRowData(response.data.rows));
      dispatch(success());
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

/** For Listing:End */
export const setPerPageSize =
  (size: number): AppThunk<any> =>
  async dispatch => {
    dispatch(setPerPage(size));
    dispatch(fetchList());
  };

export const createRecord =
  (action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.CREATE, action);
      dispatch(fetchList());
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure(error.data));
      return Promise.reject(error.data);
    }
  };

export const updateRecord =
  (id: number, action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.UPDATE(id), action);
      dispatch(fetchList());
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure(error.data));
      return Promise.reject(error.data);
    }
  };

export const deleteRecord =
  (id: number, action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.delete(API_URL.DELETE(id), action);
      dispatch(fetchList());
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
  async dispatch => {
    try {
      const response = await api.post(API_URL.CHANGE_STATUS(id), { status });
      dispatch(fetchList());
      return Promise.resolve(response.data);
    } catch (error: any) {
      return Promise.reject(error.data);
    }
  };

const roleReducer = roleSlice.reducer;
export default roleReducer;
