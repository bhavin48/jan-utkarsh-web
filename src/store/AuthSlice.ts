import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "./api";
import { AppThunk } from "./app";
import { stringEncryption } from "../config/Global";
import API_URL from "./apiUrl";

interface AuthState {
  appLoading: boolean;
  initialData: object | null;
  isLoading: boolean;
  userDetail: any;
  token: string | null;
}

const initialState = {
  appLoading: true,
  initialData: {},
  isLoading: false,
  userDetail: null,
  token: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
    setInitialData: (state, action: PayloadAction<any>) => {
      state.initialData = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserDetail: (state, action: PayloadAction<any>) => {
      state.userDetail = action.payload;
    },
    resetAuthStore: () => {
      return initialState; // Reset the state to the initial state
    },
    start: state => {
      state.isLoading = true;
    },
    success: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      localStorage.setItem("token", action.payload.token);
    },
    failure: state => {
      state.isLoading = false;
    },
  },
});

export const {
  start,
  success,
  failure,
  resetAuthStore,
  setAppLoading,
  setInitialData,
  setUserDetail,
  setUserToken,
} = authSlice.actions;

// Async action to fetch todos from the API
export const doLogin =
  (action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.LOGIN, action);
      if (action?.remember) {
        const string = JSON.stringify({
          email: action.username,
          password: action.password,
        });
        localStorage.setItem("remember_me", stringEncryption(string));
      } else {
        localStorage.removeItem("remember_me");
      }
      dispatch(success(response.data));
      dispatch(setUserToken(response.data.token));
      dispatch(setUserOptions());

      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

// Async action to fetch sync from the API
export const initialAppOptions = (): AppThunk<any> => async dispatch => {
  try {
    const token = localStorage.getItem("token") ?? null;
    let initialData = localStorage.getItem("initialData") ?? null;

    if (token) {
      dispatch(setUserToken(token));
      dispatch(setUserOptions()).catch((error: any) => error);
    }

    if (!initialData) {
      const response = await api.post(API_URL.COMMON.SYNC);
      localStorage.setItem("initialData", JSON.stringify(response.data));
      initialData = response.data;
    } else {
      initialData = JSON.parse(initialData);
    }
    dispatch(setInitialData(initialData));
    dispatch(setAppLoading(false));

    return Promise.resolve(initialData);
  } catch (error: any) {
    dispatch(setAppLoading(false));
    return Promise.reject(error.data);
  }
};

export const setUserOptions = (): AppThunk<any> => async dispatch => {
  try {
    const response = await api.get(API_URL.ME);
    dispatch(setAppLoading(false));
    dispatch(setUserDetail(response.data.user));
    return Promise.resolve(response.data);
  } catch (error: any) {
    dispatch(setAppLoading(false));
    dispatch(setUserToken(null));
    localStorage.removeItem("token");
    return Promise.reject(error.data);
  }
};

export const doLogout = (): AppThunk<any> => async dispatch => {
  try {
    const response = await api.get(API_URL.LOGOUT);
    dispatch(setUserToken(null));
    dispatch(setUserDetail(null));
    dispatch(setInitialData(null));
    localStorage.removeItem("token");
    initialAppOptions();
    return Promise.resolve(response.data);
  } catch (error: any) {
    return Promise.reject(error.data);
  }
};

export const forgotPassword =
  (action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.FORGOT_PASSWORD, action);
      dispatch(success(response.data));

      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

export const updatePassword =
  (otp: string, action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.RESET_PASSWORD(otp), action);
      dispatch(success(response.data));

      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

export const updateProfile =
  (action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.UPDATE_PROFILE, action);
      dispatch(success(response.data));

      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

export const changePassword =
  (action: any): AppThunk<any> =>
  async dispatch => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.CHANGE_PASSWORD, action);
      dispatch(success(response.data));

      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

const authReducer = authSlice.reducer;
export default authReducer;
