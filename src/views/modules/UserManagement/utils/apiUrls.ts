const baseUrl = "/v1/admin/user";

export const API_URL = {
  LIST: `${baseUrl}`,
  CREATE: `${baseUrl}/create`,
  UPDATE: (id: number): string => `${baseUrl}/${id}/update`,
  DELETE: (id: number): string => `${baseUrl}/${id}/delete`,
  DETAILS: (id: number): string => `${baseUrl}/${id}/details`,
  CHANGE_STATUS: (id: number): string => `${baseUrl}/${id}/change-status`,
};
