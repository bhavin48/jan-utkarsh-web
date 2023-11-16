import { formRules } from "../../../../../config/validations/formRules";

export const rules = {
  name: () => formRules.name(),
  permissions: [
    ({ getFieldValue }: any) => ({
      validator() {
        const permissionsArray: any = getFieldValue("permissions");
        if (permissionsArray) {
          let verified = false;
          permissionsArray.map((item: any) => {
            if (item.actions.length > 0) {
              const is_selected_index: any = item.actions.filter(
                (x: any) => x.is_selected === 1
              );
              if (is_selected_index.length > 0) {
                verified = true;
              }
            }
            return null;
          });
          if (verified) {
            return Promise.resolve();
          } else {
            return Promise.reject("Atleast one permission should be selected.");
          }
        } else {
          return Promise.resolve();
        }
      },
    }),
  ],
};
