import { Button, ButtonProps } from "antd";
import React from "react";

const CancelButton: React.FC<ButtonProps> = ({ onClick, ...rest }) => {
  return (
    <Button htmlType="button" className="cancelBtn" onClick={onClick} {...rest}>
      Cancel
    </Button>
  );
};

export default CancelButton;
