import { formRules } from "../../../config/validations/formRules";

export const rules: any = {
  new_password: (...values: any) => [
    ...formRules.password(...values),
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue("old_password") !== value) {
          return Promise.resolve();
        }
        return Promise.reject(
          "New Password should be different from Old Password."
        );
      },
    }),
  ],
  confirm_password: (...values: any) => [
    ...formRules.password(...values),
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue("new_password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          "New Password and Confirm Password should be same."
        );
      },
    }),
  ],
};
