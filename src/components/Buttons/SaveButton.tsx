import { Button, ButtonProps } from "antd";
import React from "react";

const SaveButton: React.FC<ButtonProps> = ({
  disabled,
  loading,
  name = "Save",
  ...rest
}) => {
  return (
    <Button
      disabled={disabled}
      form="form"
      loading={loading}
      htmlType="submit"
      type="primary"
      {...rest}
    >
      {name}
    </Button>
  );
};

export default SaveButton;
