import React from "react";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

interface CustomButtonProps extends ButtonProps {
  icon?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  permission = true,
  action,
  title,
  icon,
}) => {
  return permission ? (
    <Tooltip title={title}>
      <Button className={`${icon ? "iconBtn" : "primaryBtn"}`} onClick={action}>
        {icon ? <FontAwesomeIcon icon={icon} /> : title}
      </Button>
    </Tooltip>
  ) : (
    <></>
  );
};

export default CustomButton;
