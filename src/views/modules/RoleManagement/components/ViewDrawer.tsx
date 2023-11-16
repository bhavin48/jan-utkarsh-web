import React from "react";
import { Form, DrawerProps, Drawer } from "antd";
import SVGIcon from "../../../../utils/SVGIcon";
import Config from "../../../../config/Config";
import FormComponent from "./Form/FormComponent";
import CancelButton from "../../../../components/Buttons/CancelButton";
import { useAppSelector } from "../../../../store/app";

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
  const details = useAppSelector(state => state.role.details);

  const drawerClose = () => {
    close();
    form.resetFields();
  };

  return (
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
      <FormComponent form={form} id="viewForm" editValues={details} />
    </Drawer>
  );
};

export default ViewDrawer;
