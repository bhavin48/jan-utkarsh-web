import React from "react";
import { ReactComponent as SyncBtn } from "../assets/images/icon/refresh.svg";
import { ReactComponent as EditBtn } from "../assets/images/icon/edit.svg";
import { ReactComponent as DeleteBtn } from "../assets/images/icon/delete.svg";
import { ReactComponent as Close } from "../assets/images/icon/close.svg";
import { ReactComponent as View } from "../assets/images/icon/view.svg";
import { ReactComponent as Filter } from "../assets/images/icon/filter.svg";
import { ReactComponent as ChangePass } from "../assets/images/icon/change_password.svg";

interface IconProps {
  icon: string; //make the clear type to make switch
  color?: string;
  width?: number;
}

const SVGIcon: React.FC<IconProps> = ({ icon, color = "#696b71", width = 14 }: IconProps) => {
  // In this case you have to think about the switch and types in typescript.
  const Icons: any = {
    refresh: <SyncBtn fill={color} width={width} height={width} />,
    close: <Close fill={color} width={width} height={width} />,
    edit: <EditBtn fill={color} width={width} height={width} />,
    delete: <DeleteBtn fill={color} width={width} height={width} />,
    view: <View fill={color} width={width} height={width} />,
    filter: <Filter fill={color} width={width} height={width} />,
    changePass: <ChangePass fill={color} width={width} height={width} />,
  };
  return Icons[icon];
};

export default SVGIcon;
