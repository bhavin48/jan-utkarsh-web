import React, { useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/app";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Layout className={`main__page__wrapper has__header`}>
      <Layout.Content className="main__page__content">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default AuthLayout;
