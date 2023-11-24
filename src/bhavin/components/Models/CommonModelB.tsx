import React from 'react'
import { Modal, ModalProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const CommonModelB: React.FC<ModalProps> = ({ ...rest }) => {
    return (
        <div>
            <Modal
                centered
             
                footer={null}
                { ...rest }
            />
        </div>
    )
}

export default CommonModelB