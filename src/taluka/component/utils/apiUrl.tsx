const baseUrl = "/v1/admin/talukas";
const picodeList = "/v1/admin/pincodes"
export const API_URL = {
    LIST: `${baseUrl}`,
    CREATE : `${baseUrl}/create`,
    PINCODE : `${picodeList}/lov`,
    DELETE :(id : number):string => `${baseUrl}/${id}/delete`,
    VIEW : (id : number) : string => `${baseUrl}/${id}/details`,
    UPDATE: (id: number): string => `${baseUrl}/${id}/update`,
    CHANGE_STATUS: (id: number): string => `${baseUrl}/${id}/change-status`,
}