import React from "react";
import { Button } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const DeleteButton: React.FC<Partial<ButtonProps>> = ({
  action,
  data,
  permission,
  ...rest
}) => {
  if (!permission) {
    return null;
  }

  delete rest?.permissionKey;
  
  return (
    <Button
      type="text"
      title={"Delete"}
      className="deleteIcon"
      onClick={() => action && action(data)}
      {...rest}
    >
      <SVGIcon icon="delete" width={12} />
    </Button>
  );
};

export default DeleteButton;
