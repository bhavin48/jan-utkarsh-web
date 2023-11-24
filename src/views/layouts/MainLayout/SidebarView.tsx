import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import Config from "../../../config/Config";
import { useLocation, useNavigate } from "react-router-dom";
import LogoComponent from "../Components/LogoComponent";
import { AppstoreOutlined, DashboardOutlined } from "@ant-design/icons";
import { camelCaseString } from "../../../config/Global";
import { ReactComponent as UsersManagement } from "../../../assets/images/icon/Users-management.svg";
import { ReactComponent as Roles } from "../../../assets/images/icon/Roles.svg";
import MenuBG from "../../../../src/assets/images/apps/menu_bg.png";
import { useAppSelector } from "../../../store/app";

interface AppSidebarViewProps {
  collapsed: boolean;
}

const SidebarView: React.FC<AppSidebarViewProps> = ({ collapsed }) => {
  const userDetail = useAppSelector(state => state.auth.userDetail);

  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<any>([]);
  const [openMenu, setOpenMenu] = useState<any>([]);
  const defaultMenuIcon = <AppstoreOutlined />;

  const svgIcons: any = {
    Dashboard: <DashboardOutlined />,
    UsersManagement: <UsersManagement />,
    Roles: <Roles />,
  };

  const AppMenu = (
    menu_item: any,
    open: any = [],
    parentKey: any = null
  ): any => {
   
   
    return menu_item
      ? Object.keys(menu_item).map(key => {
          const item: any = menu_item[key];    
               
          if (item.children) {      
        
            return {
              key: item.id + "",
              url: item.path,
              label: item.label,
              icon:        // replaceAll -> remove space
                svgIcons[camelCaseString(item.label).replaceAll(" ", "")] ?? 
                defaultMenuIcon,
              children: AppMenu(item.children, open, item.id + ""),
              
            };
          } else {
            if (
              location.pathname == item.path &&
              openMenu.length <= 0 &&
              parentKey
            ) {
              if (open.length === 0) {
                open.push(parentKey);
              }
              setOpenMenu(open);
            }
            return {
              key: item.path,
              url: item.path,
              label: item.label,
              icon:
                svgIcons[camelCaseString(item.label).replaceAll(" ", "")] ??
                defaultMenuIcon,
            };
          }
        })
      : null;
  };

  useEffect(() => {
    const menuItemsTemp = AppMenu(userDetail?.menu);
    setMenu(menuItemsTemp);
  }, [userDetail, location]);

  return (
    <Layout.Sider
      collapsed={collapsed}
      width={Config.sidebar_width}
      className="main__page__appsidebar"
      style={{ backgroundImage: `url(${MenuBG})` }}
    >
      <LogoComponent collapsed={collapsed} />
      <Menu
        mode="inline"
        theme="dark"
        activeKey={location.pathname}
        items={menu}
        onClick={item => navigate(item.key)}
        openKeys={openMenu}
        onOpenChange={openKeys => {
          setOpenMenu(openKeys);
        }}
      />
    </Layout.Sider>
  );
};

export default SidebarView;
