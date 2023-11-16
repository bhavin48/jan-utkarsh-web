import { Button, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NotFoundImg from "../../assets/images/404_images.png";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="section pagenotfound__section">
      <img src={NotFoundImg} alt="Not Found" />
      <p className="notFoundText">
        Sorry, the page you visited does not exist.
      </p>
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
}

export default PageNotFound;
