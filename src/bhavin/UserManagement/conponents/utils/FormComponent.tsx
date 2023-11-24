import React, { useEffect } from 'react'
import { FormBox, InputBox } from '../../../../components/AntdAddons'
import { Col, Row } from 'antd'
import { rules } from '../../../../views/modules/UserManagement/components/Form/rules'
import { useAppDispatch, useAppSelector } from '../../../../store/app'
import { fetchRolesList } from '../../../../store/CommonSlice'

import dayjs from "dayjs";
import { CONSTANT } from '../../../../config/Constant'
const FormComponent: React.FC<any> = ({
  form,
  id,
  handleSubmit,
  onValuesChange,
}) => {

  const { rolesList } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();
  const onFinish = (data: any) => {
    console.log("Form submitted with data:", data);
    data.dob = dayjs(data.dob).format(CONSTANT.POST_DATE_FORMAT);
    

    handleSubmit(data);
  };

  const minDate = dayjs().subtract(18, "years");
  const disableDate = (current: any) => {
    return current && current > minDate;
  };

  useEffect(() => {
    dispatch(fetchRolesList()).catch((error: any) => error);
  }, []);
  return (
    <>
      <FormBox
        form={form}
        id={id}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={15}>
          <br />
          <br />
          <Col xs={{ span: 24 }}>
            <b>User Details:</b>
          </Col>
          <br />
          <br />

          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="First Name"
              name="name"
              rules={rules.name()}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Last Name"
              name="last_name"
              rules={rules.name()}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Mobile Number"
              name="mobile_no"
              placeholder="+1 (000) 000-0000"
              rules={rules.mobileNumber()}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              name="email"
              label="Email"
              rules={rules.email()}
            // disabled={editValues ? true : false}
            />
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              required
              label="Role"
              name="role_id"
              options={{
                list: rolesList,
                valueKey: "id",
                textKey: "name",
              }}
            />
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.DatePicker
              required
              label="Date of birth"
              name="dob"
              rules={rules.dateOfBirth()}
              disabledDate={disableDate}
              defaultPickerValue={minDate}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Password
              required
              name="password"
              label="Password"
              rules={rules.password()}
            />
          </Col>
        </Row>
      </FormBox>
    </>
  )
}

export default FormComponent