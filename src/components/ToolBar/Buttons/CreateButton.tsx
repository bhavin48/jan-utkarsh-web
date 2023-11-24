import React from "react";
import { Button } from "antd";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";
import { checkPrivileges } from "../../../config/Global";
import { useAppSelector } from "../../../store/app";

const CreateButton: React.FC<ButtonProps> = ({
  action,
  permissionKey,
  permission,
  name = "Create",
}) => {

  const userDetail = useAppSelector(state => state.auth.userDetail);

  const permitted = permissionKey
    ? checkPrivileges(userDetail, permissionKey)
    : permission;
    
  return permitted ? (
    <Button className="primaryBtn" onClick={action}>
      {name}
    </Button>
  ) : (
    <></>
  );
};

export default CreateButton;
