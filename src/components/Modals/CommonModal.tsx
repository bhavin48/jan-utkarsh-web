import React from "react";
import { Modal, ModalProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CommonModal: React.FC<ModalProps> = ({ ...rest }) => {
  return (
    <Modal
      centered
      className="create_modal"
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={null}
      {...rest}
    />
  );
};

export default CommonModal;
