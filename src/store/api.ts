// src/api.ts
import { NamePath } from "antd/lib/form/interface";
import axios from "axios";
import { Notification } from "../config/Global";
import { FormInstance } from "antd";
// import store from './app';

export type ErrorProps = {
  errors: {
    [key: string]: string[];
  };
  [key: string]: any;
};

export type FormattedErrorProps = {
  name: NamePath;
  errors: string[];
};

// Set your API base URL here
const BASE_URL = process.env.REACT_APP_API_URL;

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Add interceptors for request and response
api.interceptors.request.use(
  config => {
    let header: any = config.headers;
    header = {
      ...header,
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const authToken = localStorage.getItem("token");
    header = authToken
      ? {
          ...header,
          Accept: "application/json",
          Authorization: "Bearer " + authToken,
        }
      : {
          ...header,
          Accept: "application/json",
        };
    config.headers = header;

    // Perform any operations before the request is sent
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    if (response.data?.STATUS?.NOTIFICATION) {
      response.data.STATUS.NOTIFICATION.map((err: string) =>
        Notification.success({
          message: err,
        })
      );
    }
    // Process response data before returning
    return response;
  },
  error => {
    console.log('error', error);
    
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        // store.dispatch(resetAuthStore);
      } else if (error.response.status === 422) {
        //
      }  else if (error.response.status === 500) {
        Notification.error({
          message: "Something Went Wrong",
        });
      } else if (error.response.data && error.response.data?.STATUS?.NOTIFICATION) {
        error.response.data.STATUS.NOTIFICATION.map((err: string) =>
          Notification.error({
            message: err,
          })
        );
      } else {
        Notification.error({
          message: `Network Issue.`,
        });
      }

      return Promise.reject(error.response);
    } else {
      Notification.error({
        message: `Network Issue.`,
      });
      return Promise.reject({
        data: [],
        message: `Network Issue.`,
      });
    }
  }
);

export const assignErrorToInput = (form: FormInstance, errors?: ErrorProps) => {
  const formattedErrors: FormattedErrorProps[] = [];
  if (errors) {
    Object.keys(errors).forEach(key => {
      formattedErrors.push({
        name: key,
        errors: errors[key],
      });
    });
    formattedErrors.forEach(x => {
      if (typeof x.name === "string" && x.name.indexOf(".") !== -1) {
        const name: any = x.name.split(".");
        name.forEach((e: any) => {
          if (!isNaN(parseInt(e))) {
            e = parseInt(e);
          }
        });
      }
    });
  }
  return form.setFields(formattedErrors);
};

export default api;
