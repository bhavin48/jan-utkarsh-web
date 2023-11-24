import { Button } from 'antd';
import React, { useState } from 'react'
import CommonModelB from './CommonModelB';

const ClickModel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const demoDone = () =>{
        alert("done")
        handleCancel()
    }
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>

            <CommonModelB
                open={isModalOpen}
                title={"Click Button"}
                onCancel={handleCancel}
                footer = {[
                    <Button key="2" onClick={handleCancel}>Cancle</Button>,
                    <Button key="1" onClick={demoDone}>Done</Button>,
                ]}
            >
                <div>
                    <p>Bhavin Demo</p>
                </div>
            </CommonModelB>
        </div>
    )
}

export default ClickModel