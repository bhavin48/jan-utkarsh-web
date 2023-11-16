const API_URL = {
  LOGIN: `/v1/admin/login`,
  // REGISTER: ``,
  FORGOT_PASSWORD: `/v1/admin/forgot-password`,
  ME: `/v1/admin/me`,
  LOGOUT: `/v1/admin/logout`,
  CHANGE_PASSWORD: `/v1/admin/change-password`,
  UPDATE_PROFILE: `/v1/admin/update-profile`,
  RESET_PASSWORD: (otp: string): string => `/v1/admin/${otp}/reset-password`,

  // Common Api URL
  COMMON: {
    SYNC: `/v1/sync`,
    PRIVILEGES: `/v1/privileges-list`,
    ROLES_LIST: (search: string): string =>
      `/v1/roles-list${search ? `?search=${search}` : ""}`,
  },
};

export default API_URL;
