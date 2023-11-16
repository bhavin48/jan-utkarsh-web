import { BreadcrumbConfigProps } from "./InterfacesAndTypes";

export const defaultBreadcrumbPath = [{ name: "Dashboard", link: "/" }];

export const UserBreadcrumb: BreadcrumbConfigProps = {
  title: "User Management",
  path: [...defaultBreadcrumbPath, { name: "User Management" }],
};

export const RoleBreadcrumb: BreadcrumbConfigProps = {
  title: "Roles Management",
  path: [...defaultBreadcrumbPath, { name: "Roles" }],
};
