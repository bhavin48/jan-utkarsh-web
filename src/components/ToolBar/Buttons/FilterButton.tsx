import React from "react";
import { Button, Tooltip } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import { ButtonProps } from "../../Buttons/interface/ButtonInterface";

const FilterButton: React.FC<ButtonProps> = ({
  action,
  title = "Filter",
  showIcon = true,
  permission = true,
}) => {
  return permission ? (
    <Tooltip title={title}>
      <Button
        className={`${showIcon ? "iconBtn" : "primaryBtn"}`}
        onClick={action}
      >
        {showIcon ? (
          <SVGIcon icon="filter" color="#696b71" width={20} />
        ) : (
          title
        )}
      </Button>
    </Tooltip>
  ) : (
    <></>
  );
};

export default FilterButton;
