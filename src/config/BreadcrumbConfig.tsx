import { BreadcrumbConfigProps } from "./InterfacesAndTypes";

export const defaultBreadcrumbPath = [{ name: "admin", link: "/" }];

export const UserBreadcrumb: BreadcrumbConfigProps = {
  title: "User Management",
  path: [...defaultBreadcrumbPath, { name: "User Management" }],
};

export const RoleBreadcrumb: BreadcrumbConfigProps = {
  title: "Roles Management",
  path: [...defaultBreadcrumbPath, { name: "Roles" }],
};

export const UserBreadcrumbB: BreadcrumbConfigProps = {
  title: "UserB Management",
  path: [...defaultBreadcrumbPath, { name: "UserB Management" }],
};

export const TalukaBreadcrumb: BreadcrumbConfigProps = {
  title: "MLA Grant",
  path: [...defaultBreadcrumbPath, { name: "Talukas Management" }],
};
