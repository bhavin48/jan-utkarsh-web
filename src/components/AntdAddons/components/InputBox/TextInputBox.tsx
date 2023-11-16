import React from "react";
import { Input } from "antd";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";
import { InputBoxProps } from "./interface";
import { validations } from "../../../../config/validations/validations";
import { toLowerCaseWithUnderscore } from "../../../AgGridWrapper/utils/commonFunctions";

const TextInputBox: React.FC<InputBoxProps> = props => {
  const {
    formProps: { label, required, numberRules, minMaxRules, ...formProps },
    inputProps,
  } = SplitInputWrapperProps(props);

  //for adding default rules if rules is true
  // typeof formProps.rules === "boolean"
  // ? formProps.rules && [
  //     formProps.required && validations.required.text(),
  //     validations.min.text(),
  //     validations.max.text(),
  //   ]
  // : formProps.rules
  const validateValue = (_: any, value: any) => {
    switch (true) {
      case required && value === undefined:
        return Promise.reject(validations.required.text().message);
      case numberRules && isNaN(value):
        return minMaxRules && Promise.reject("Please enter a valid number.");
      case value < minMaxRules?.min || value > minMaxRules?.max:
        return Promise.reject(
          `Please enter a value between ${minMaxRules.min} to ${minMaxRules.max}.`
        );
      default:
        return Promise.resolve();
    }
  };
  return (
    <InputWrapper
      name={label && toLowerCaseWithUnderscore(label)}
      rules={
        numberRules
          ? [{ validator: validateValue }]
          : required
          ? [validations.required.text()]
          : []
      }
      required={required}
      label={label}
      {...formProps}
    >
      <Input placeholder={label} {...inputProps} />
    </InputWrapper>
  );
};

export default TextInputBox;
