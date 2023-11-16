import React from "react";
import { Layout } from "antd";
import moment from "moment";

const FooterView: React.FC = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      © {moment().format("Y")} <span>{process.env.REACT_APP_APP_NAME ?? ""}</span> (All right reserved)
    </Layout.Footer>
  );
};

export default FooterView;
