export const CONSTANT = {
  DATE_FORMAT: "DD-MM-YYYY",
  TIME_FORMAT: "HH:mm",
  DATE_TIME_FORMAT: "DD-MM-YYYY HH:mm",
  POST_DATE_FORMAT: "YYYY-MM-DD",
  POST_TIME_FORMAT: "HH:mm",
  POST_DATE_TIME_FORMAT: "YYYY-MM-DD HH:mm",
  DRAWER_TYPE: {
    ADD: "add",
    EDIT: "edit",
    VIEW: "view",
  },

  PER_PAGE_RECORD: [
    { id: "5", value: "5 Per Page" },
    { id: "10", value: "10 Per Page" },
    { id: "50", value: "50 Per Page" },
    { id: "100", value: "100 Per Page" },
    { id: "500", value: "500 Per Page" },
    { id: "1000", value: "1000 Per Page" },
  ],
};

export const BASE_URL = process.env.REACT_APP_API_URL;

//Dropdowns
export const genderOptions = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
  { id: 3, name: "Other" },
];
