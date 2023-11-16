import React from "react";
import { Input } from "antd";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";
import { TextAreaBoxProps } from "./interface";
import { validations } from "../../../../config/validations/validations";
const { TextArea } = Input;

const TextAreaInputBox: React.FC<TextAreaBoxProps> = ({
  rows = 4,
  ...rest
}) => {
  const { formProps, inputProps } = SplitInputWrapperProps(rest);

  return (
    <InputWrapper
      rules={formProps.required ? [validations.required.text()] : []}
      {...formProps}
    >
      <TextArea placeholder={formProps?.label} {...inputProps} rows={rows} />
    </InputWrapper>
  );
};

export default TextAreaInputBox;
