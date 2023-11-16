import { maxName, maxPassword, minName, minPassword, validations } from "./validations";

export const formRules: any = {
  name: (min?: number, max?: number, field?: string) => [
    validations.required.text(field),
    validations.min.text(minName, field),
    validations.max.text(maxName, field),
  ],
  phone: (field?: string) => [
    validations.required.text(field),
  ],
  mobileNumber: (field?: string) => [
    validations.required.text(field),
  ],
  email: (field?: string) => [
    validations.required.text(field),
    validations.email(field),
  ],
  password: (min = minPassword, max = maxPassword, field?: string) => [
    validations.required.text(field),
    validations.pattern.password(field),
    validations.min.text(min),
    validations.max.text(max),
  ],
};
