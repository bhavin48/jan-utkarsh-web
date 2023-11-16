import { ButtonProps as AntdButtonProps } from "antd/es/button";
export interface ButtonProps extends AntdButtonProps {
  action: (params?: any) => any;
  title?: string;
  showIcon?: boolean;
  data?: any;
  permissionKey: string;
  permission?: boolean;
  iconProps?: { icon?: string; color?: string; width?: number };
}
