import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbConfigProps } from "../../config/InterfacesAndTypes";

interface ToolBarProps {
  breadcrumbs: BreadcrumbConfigProps;
  children?: any;
}

const ToolBar: React.FC<ToolBarProps> = ({ breadcrumbs, children }) => {
  return (
    <div className="mainPageHeader">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="btnWrap">{children}</div>
    </div>
  );
};

export default ToolBar;
