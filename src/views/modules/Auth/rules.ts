import { RequestProps } from "../../../config/InterfacesAndTypes";
import { validations } from "../../../config/validations/validations";

export const LoginRequest = (): RequestProps => ({
  email: (field?: string) => [
    validations.required.text(field),
    validations.email(field),
  ],
  password: (field?: string) => [validations.required.text(field)],
  confirmPassword: (field?: string) => [
    validations.required.text(field),
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          "New Password and Confirm Password does not match."
        );
      },
    }),
  ],
});
