import { Modal } from "antd";
import React from "react";
import LoginForm from "../modules/Auth/Login/LoginForm";

const Unauthorized: React.FC = () => {
  // const { AUTH } = useStore();
  // let isUnauthorised = AUTH.isUnauthorized();
  //
  // useEffect(() => {
  //   isUnauthorised = AUTH.isUnauthorized();
  // }, [isUnauthorised]);

  return (
    <Modal
      // title="New Topic"
      width={540}
      // open={isUnauthorised}
      centered
      // onCancel={drawerClose}
      destroyOnClose
      footer={null}
    >
      <LoginForm />
    </Modal>
  );
};

export default Unauthorized;
