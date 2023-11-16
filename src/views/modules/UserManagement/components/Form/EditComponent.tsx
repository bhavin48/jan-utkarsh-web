import { useState } from "react";
import { Form, DrawerProps, Drawer } from "antd";
import { updateRecord } from "../../utils/slice";
import { validateFields } from "../../../../../config/Global";
import SVGIcon from "../../../../../utils/SVGIcon";
import Config from "../../../../../config/Config";
import CancelButton from "../../../../../components/Buttons/CancelButton";
import SaveButton from "../../../../../components/Buttons/SaveButton";
import FormComponent from "./FormComponent";
import { assignErrorToInput } from "../../../../../store/api";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/app";

interface EditDrawerProps extends DrawerProps {
  titleName: string;
  open: boolean;
  close: () => void;
}

const EditComponent: React.FC<EditDrawerProps> = ({
  titleName,
  open,
  close,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(state => state.user.details);
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

  const handleSubmit = (data: any) => {
    setSaving(true);
    dispatch(updateRecord(details.id, data))
      .then(() => {
        drawerClose();
      })
      .catch((error: any) => {
        assignErrorToInput(form, error?.STATUS);
      })
      .finally(() => setSaving(false));
  };

  return (
    <Drawer
      title={`Edit ${titleName}`}
      open={open}
      width={"70%"}
      onClose={drawerClose}
      destroyOnClose
      closeIcon={<SVGIcon icon="close" color={Config.themePrimaryBtn} />}
      footer={[
        <CancelButton key={2} onClick={drawerClose} />,
        <SaveButton
          key={1}
          form="editForm"
          disabled={disabled}
          loading={saving}
        />,
      ]}
      {...rest}
    >
      <FormComponent
        form={form}
        id="editForm"
        editValues={details}
        handleSubmit={handleSubmit}
        onValuesChange={validateForm}
      />
    </Drawer>
  );
};

export default EditComponent;
