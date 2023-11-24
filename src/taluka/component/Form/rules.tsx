import { formRules } from "../../../config/validations/formRules";
import { validations } from "../../../config/validations/validations";

export const rules: any = {
    name: () => formRules.name(),
    pincode : (field?: string) => [validations.required.select(field)]
}