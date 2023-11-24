import React from "react";
import { Button } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const LockButton: React.FC<Partial<ButtonProps>> = ({
  action,
  data,
  permission,
  iconProps,
  ...rest
}) => {

  if (!permission) {
    return null;
  }


  // delete rest?.permissionKey;

  return (
    <Button
      type="text"
      title={"Change Password"}
      className="editIcon"
      onClick={() => action && action(data)}
      {...rest}
    >
      <SVGIcon icon="changePass" {...iconProps} />
    </Button>
  );
};

export default LockButton;
