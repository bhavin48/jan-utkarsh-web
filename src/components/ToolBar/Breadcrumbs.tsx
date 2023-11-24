import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { BreadcrumbComponentItemTypes, BreadcrumbConfigProps } from "../../config/InterfacesAndTypes";
interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbConfigProps;
}
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {

  const breadcrumbItems = breadcrumbs.path?.map(
    (item: BreadcrumbComponentItemTypes) => {
      return {
        title: item.link ? <Link to={item.link}>{item.name}</Link> : item.name,
      };
    }
  );

  return <Breadcrumb className="ph-gutter" items={breadcrumbItems} />;
};

export default Breadcrumbs;
