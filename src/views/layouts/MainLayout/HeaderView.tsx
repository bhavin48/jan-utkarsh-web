import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Dropdown, Layout } from "antd";
import Avatar from "../../../assets/images/user.png";
import { DownOutlined } from "@ant-design/icons";
import { ReactComponent as ProfileIcon } from "../../../assets/images/icon/user.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/images/icon/logout.svg";

import { Link, useNavigate } from "react-router-dom";
import { doLogout } from "../../../store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../store/app";

interface HeaderViewProps {
  collapsed: boolean;
  SetCollapsed: Dispatch<SetStateAction<boolean>>;
}

const HeaderView: React.FC<HeaderViewProps> = ({ collapsed, SetCollapsed }) => {
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector(state => state.auth.userDetail);
  const navigate = useNavigate();

  // call logout function
  const logout = () => {
    dispatch(doLogout()).then(() => {
      navigate("/login");
    });
  };

  const items = [
    {
      label: (
        <Link to="/profile">
          <ProfileIcon />
          <span>Profile</span>
        </Link>
      ),
      key: "profile",
    },
    {
      label: (
        <div onClick={() => logout()}>
          <LogoutIcon />
          <span>Logout</span>
        </div>
      ),
      key: "Logout",
    },
  ];

  useEffect(() => {
    //
  }, [userDetail]);

  return (
    <Layout.Header className="main__page__appheader">
      <div className="headerWrap">
        <div className="appheader__left">
          <div className="menuToggle">
            <div
              className={`${collapsed ? "icon right" : "icon"}`}
              onClick={() => SetCollapsed(!collapsed)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => SetCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        /> */}
          </div>
        </div>
        <div className="appheader__right">
          <div className="userDropdown">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              overlayClassName="userMenuList"
            >
              <div className="userMenuWrap">
                <span className="avatar">
                  <img src={Avatar} alt="Avatar" />
                </span>
                <span className="userName">
                  {userDetail && (userDetail.name ? userDetail.name : "")}
                </span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderView;
