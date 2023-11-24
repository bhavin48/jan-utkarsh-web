import { Button, Drawer, DrawerProps, Form } from 'antd'
// import { Row } from 'antd/lib'
import React, { useState } from 'react'
import SVGIcon from '../../../utils/SVGIcon'
import FormComponent from './utils/FormComponent'
// import { useNavigate } from 'react-router-dom'
// import CreateBtn from '../../components/Buttons/CreateBtn'
import { validateFields } from '../../../config/Global'
import { useAppDispatch } from '../../../store/app'
import { createRecord } from './utils/sliceB'
// import { error } from 'console'
import { assignErrorToInput } from '../../../store/api'
import Config from '../../../config/Config'

interface AddDrawerProps extends DrawerProps {
  titleName: string;
  close: () => void
}

const AddComponent : React.FC<AddDrawerProps> = ({
  titleName,
  close,
  ...rest
}) => {

  const [form] = Form.useForm()
  const [saving, setSaving] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true);

  const dispatch = useAppDispatch()

  const drawerClose = () => {
    close();
    form.resetFields();
    setDisabled(true)
  };
  const handleFormSubmit = (data: any) => {
    setSaving(true);
    console.log("handleFormSubmit data:", data);
    data.decline_to_answer_disabilities = {disabled}
    data.decline_to_answer_gender = "MALE"
    data.decline_to_answer_race_id = "3"
    data.decline_to_answer_veteran_status = "active"
    data.latitude = "Test"
    data.location = "test"
    data.longitud = "testData"
    dispatch(createRecord(data))
    .then(() => {
      drawerClose()
    })
    .catch((error : any) => {
      assignErrorToInput(form , error?.STATUS)
    })
    .finally(() => setSaving(false))
    
    
  };

  const validateForm = () => {
    validateFields(form, setDisabled);
  };

  console.log(disabled);
  

  return (
    <>

      <Drawer
        title={`Add ${titleName}`}
        placement="right"
        onClose={drawerClose}
        className='cancelBtn'
        destroyOnClose
        closeIcon={<SVGIcon icon="close" color={Config.themePrimaryBtn} />}
        footer={[
          <Button key="2" htmlType='button' onClick={drawerClose}>Cancel</Button>,
          <Button key="1" htmlType='submit' type='primary' form="AddForm1" loading={saving}>Save</Button>
        ]}
        {...rest}
      >
       
        <FormComponent
          form={form}
          id="AddForm1"
          handleSubmit={handleFormSubmit}
          onValuesChange={validateForm}
        />
      </Drawer>
    </>
  )
}

export default AddComponent