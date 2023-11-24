import { InputNumber } from "antd";
import React from "react";
import { InputWrapper, SplitInputWrapperProps } from "../../functions";
import { NumberInputBoxProps } from "./interface";
import { toLowerCaseWithUnderscore } from "../../../AgGridWrapper/utils/commonFunctions";
import { validations } from "../../../../config/validations/validations";

const NumberInputBox: React.FC<NumberInputBoxProps> = props => {
  const { formProps, inputProps } = SplitInputWrapperProps(props);
  return (
    <InputWrapper
      rules={formProps.required ? [validations.required.text()] : []}
      name={formProps.label && toLowerCaseWithUnderscore(formProps.label)}
      {...formProps}
    >
      <InputNumber placeholder={formProps?.label}  />
    </InputWrapper>
  );
};

export default NumberInputBox;
