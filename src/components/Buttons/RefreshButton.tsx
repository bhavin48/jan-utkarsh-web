import React from "react";
import { Button, Tooltip } from "antd";
import { ButtonProps } from "./interface/ButtonInterface";
import Config from "../../config/Config";
import SVGIcon from "../../utils/SVGIcon";

const RefreshButton: React.FC<ButtonProps> = ({
  action,
  title = "Refresh",
  showIcon = true,
}) => {
  return (
    <Tooltip title={title}>
      <Button
        className={`${showIcon ? "iconBtn" : "primaryBtn"}`}
        onClick={action}
      >
        {showIcon ? (
          <SVGIcon icon="refresh" color={Config.themePrimaryBtn} width={16} />
        ) : (
          title
        )}
      </Button>
    </Tooltip>
  );
};

export default RefreshButton;
