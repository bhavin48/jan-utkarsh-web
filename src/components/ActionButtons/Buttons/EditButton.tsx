import React from "react";
import { Button } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const EditButton: React.FC<Partial<ButtonProps>> = ({
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
      title={"Edit"}
      className="editIcon"
      onClick={() => action && action(data)}
      {...rest}
    >
      <SVGIcon icon="edit" />
    </Button>
  );
};

export default EditButton;
