const baseUrl = "/v1/admin/user";

export const API_URL = {
    LIST: `${baseUrl}`,
    CREATE: `${baseUrl}/create`,
    CHANGE_STATUS: (id: number): string => `${baseUrl}/${id}/change-status`,
    DELETE: (id: number): string => `${baseUrl}/${id}/delete`,
}