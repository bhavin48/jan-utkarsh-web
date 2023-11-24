import { Form, DrawerProps, Drawer, Descriptions } from "antd";
import SVGIcon from "../../../utils/SVGIcon";
import Config from "../../../config/Config";
import CancelButton from "../../../components/Buttons/CancelButton";
import { renderNA } from "../../../components/AgGridWrapper/utils/commonFunctions";
import React from "react";
import { useAppSelector } from "../../../store/app";

interface ViewDrawerProps extends DrawerProps {
    titleName: string;
    open: boolean;
    close: () => void;
}

const ViewDrawer: React.FC<ViewDrawerProps> = ({
    titleName,
    open,
    close,
    ...rest
}) => {
    const [form] = Form.useForm();
    const drawerClose = () => {
        close();
        form.resetFields();
    };

    const details = useAppSelector(state => state.taluka.details)
    return (
        <>
            <Drawer
                title={`View ${titleName}`}
                open={open}
                placement="right"
                width={"70%"}
                onClose={drawerClose}
                destroyOnClose
                closeIcon={<SVGIcon icon="close" color={Config.themePrimaryBtn} />}
                footer={[<CancelButton key={2} onClick={drawerClose} />]}
                {...rest}
            >
                <Descriptions column={2} bordered layout="horizontal">
                    <Descriptions.Item
                    label="Taluka"
                    >
                        {renderNA(details?.name)}
                    </Descriptions.Item>
                    <Descriptions.Item
                    label="pincode"
                    >
                        {renderNA(details?.pincode.pincode)}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDrawer