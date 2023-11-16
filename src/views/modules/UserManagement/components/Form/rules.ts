import { formRules } from "../../../../../config/validations/formRules";
import { maxPassword, minPassword, validations } from "../../../../../config/validations/validations";

export const rules: any = {
  name: () => formRules.name(),
  email: (field?: string) => [
    validations.required.text(field),
    validations.email(field),
  ],
  mobileNumber: () => formRules.mobileNumber(),
  roleId: (field?: string) => [validations.required.select(field)],
  password: (field?: any) => [
    validations.required.text(field),
    validations.pattern.password(field),
    validations.min.text(minPassword),
    validations.max.text(maxPassword),
  ],
  dateOfBirth: (field?: string) => [validations.required.text(field)],
  gender: (field?: string) => [validations.required.select(field)],
};
