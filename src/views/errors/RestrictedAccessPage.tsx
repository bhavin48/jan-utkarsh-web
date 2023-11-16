import { Button, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DeniedImg from "../../assets/images/access-denied.png";

const RestrictedAccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section pagenotfound__section accessDeniedPage">
      <div className="content">
        <h1>Oops!</h1>
        <h2>Permission Denied</h2>
        <p>Sorry, The module you trying to access is not permissible</p>
      </div>
      <div className="notFoundImg">
        <img src={DeniedImg} alt="" />
      </div>
      <Space size="large" className="mt-30">
        <Button size="large" type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button size="large" type="primary">
          <Link to={"/"}>Back Home</Link>
        </Button>
      </Space>
    </section>
  );
};

export default RestrictedAccessPage;
