import React from "react";
import { useState } from "react";
import { Form, DrawerProps, Button, Drawer } from "antd";
import { validateFields } from "../../../../../config/Global";
import { assignErrorToInput } from "../../../../../store/api";
import SVGIcon from "../../../../../utils/SVGIcon";
import Config from "../../../../../config/Config";
import { createRecord } from "../../utils/slice";
import FormComponent from "./FormComponent";
import { useAppDispatch } from "../../../../../store/app";

interface AddDrawerProps extends DrawerProps {
  titleName: string;
  close: () => void;
}

const AddComponent: React.FC<AddDrawerProps> = ({
  titleName,
  close,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const drawerClose = () => {
    close();
    form.resetFields();
    setDisabled(true)
  };

  const validateForm = () => {
    validateFields(form, setDisabled);
  };

  const handleFormSubmit = (data: any) => {
    setSaving(true);
    dispatch(createRecord(data))
      .then(() => {
        drawerClose();
      })
      .catch((error: any) => {
        assignErrorToInput(form, error?.STATUS);
      })
      .finally(() => setSaving(false));
  };
  console.log(disabled);
  
  return (
    <Drawer
      title={`Add ${titleName}`}
      placement="right"
      width={"70%"}
      onClose={drawerClose}
      destroyOnClose
      closeIcon={<SVGIcon icon="close" color={Config.themePrimaryBtn} />}
      footer={[
        <Button
          key="2"
          htmlType="button"
          className="cancelBtn"
          onClick={drawerClose}
        >
          Cancel
        </Button>,
        <Button
          key="1"
          htmlType='submit'
          type='primary'
          form="addForm"
          loading={saving}
        >save</Button>
      ]}
      {...rest}    // open drawer
    >
      <FormComponent
        form={form}
        id="addForm"
        handleSubmit={handleFormSubmit}
        onValuesChange={validateForm}
      />
    </Drawer>
  );
};

export default AddComponent;
