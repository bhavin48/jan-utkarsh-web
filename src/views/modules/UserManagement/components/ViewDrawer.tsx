import { Form, DrawerProps, Drawer, Descriptions } from "antd";
import SVGIcon from "../../../../utils/SVGIcon";
import Config from "../../../../config/Config";
import CancelButton from "../../../../components/Buttons/CancelButton";
import { renderNA } from "../../../../components/AgGridWrapper/utils/commonFunctions";
import { genderOptions } from "../../../../config/Constant";
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
  const details = useAppSelector(state => state.user.details);

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
      <Descriptions column={2} bordered layout="horizontal">
        <Descriptions.Item label="First Name">
          {renderNA(details?.name)}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {renderNA(details?.last_name)}
        </Descriptions.Item>
        <Descriptions.Item label="Mobile Number">
          {renderNA(details?.mobile_no)}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {renderNA(details?.email)}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          {renderNA(details?.role?.name)}
        </Descriptions.Item>
        {details?.role?.id !== 1 && (
          <>
            <Descriptions.Item label="Date of Birth">
              {renderNA(details?.dob)}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {renderNA(
                genderOptions.find(
                  (option: any) => option.id === details?.gender
                )?.name
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Disabilities">
              {renderNA(details?.disabilities)}
            </Descriptions.Item>
            <Descriptions.Item label="Race">
              {renderNA(details?.race?.name)}
            </Descriptions.Item>
            <Descriptions.Item label="Veteran Status">
              {renderNA(details?.veteran?.name)}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {renderNA(details?.location)}
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </Drawer>
  );
};

export default ViewDrawer;
