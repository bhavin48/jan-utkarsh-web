import React, { useCallback, useState } from "react";
import { Button, ModalProps } from "antd";
import CommonModal from "./CommonModal";
import { useAppDispatch, useAppSelector } from "../../store/app";

interface ChangeStatusModalProps extends ModalProps {
  titleName: string;
  close: any;
  data: any;
  callApi: any;
}

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  titleName,
  close,
  data,
  callApi,
  ...rest
  
}) => {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState<boolean>(false);

  console.log("data " , data);
  
  const onYesClick = useCallback(() => {
    setSaving(true);
    dispatch(callApi(data?.id, data?.status))
      .then(() => {
        close();
      })
      .finally(() => setSaving(false))
      .catch((e: any) => e);
  }, [data]);

  // console.log("userDetails " , data?.name);


  return data ? (
    <CommonModal
      className="deleteModal"
      title={`${data?.status ? "Activate" : "Deactivate"} ${titleName}?`}
      open={data ? true : false}
      onCancel={close}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          No
        </Button>,
        <Button
          key="1"
          htmlType="button"
          type="primary"
          loading={saving}
          onClick={onYesClick}
        >
          Yes
        </Button>,
      ]}
      {...rest}
    >
      <div className="deleteNote">
        Are you sure want to {data?.status ? "Activate" : "Deactivate"} {data.data.name} {data.data.pincode.pincode}?
      </div>
    </CommonModal>
  ) : (
    <></>
  );
};
export default ChangeStatusModal;
