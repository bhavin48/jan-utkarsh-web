import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Popover, Row, Tabs } from "antd";
import type { TabsProps } from "antd";
import { InputBox } from "../../../components/AntdAddons";
import { ReactComponent as UserIcon } from "../../../assets/images/icon/user.svg";
import { ReactComponent as PasswordIcon } from "../../../assets/images/icon/lock_final.svg";
import { assignErrorToInput } from "../../../store/api";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../store/app";
import { changePassword, updateProfile } from "../../../store/AuthSlice";
import { formRules } from "../../../config/validations/formRules";
import { rules } from "./rules";

const Profile: React.FC<any> = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const userDetail = useSelector((state: RootState) => state.auth.userDetail);
  const [tooltip, setTooltip] = useState(false);
  const [form] = Form.useForm();
  const profileForm = useRef<any>();
  const updatePasswordForm = useRef<any>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const passwordTooltip = (
    <div>
      <div>at least 1 numeric character</div>
      <div>at least 1 special character</div>
      <div>at least 1 uppercase letter</div>
      <div>at least 8 character</div>
    </div>
  );
  useEffect(() => {
    form.setFieldsValue(userDetail);
  }, [userDetail]);

  const onChange = () => {
    profileForm?.current
      ?.validateFields()
      .then(() => {
        setDisabled(false);
      })
      .catch((e: any) => {
        if (e.errorFields && e.errorFields.length > 0) {
          setDisabled(false);
        }
      });
  };

  const handleSubmit = (formDataValue: any) => {
    setSaving(true);
    const formData = { ...formDataValue, role_id: userDetail?.roles_id };
    dispatch(updateProfile(formData))
      .then(() => {
        setDisabled(true);
        setTooltip(false);
      })
      .catch((error: any) => {
        assignErrorToInput(profileForm.current, error?.STATUS);
      })
      .finally(() => setSaving(false));
  };

  const onPasswordChange = () => {
    setTooltip(true);
    updatePasswordForm?.current
      ?.validateFields()
      .then(() => {
        setDisabled(false);
        setTooltip(false);
      })
      .catch((e: any) => {
        if (e.errorFields && e.errorFields.length > 0) {
          setDisabled(true);
        }
      });
  };

  const updatePassword = (data: any) => {
    setSaving(true);
    dispatch(changePassword(data))
      .then(() => {
        updatePasswordForm?.current?.resetFields();
        setDisabled(true);
      })
      .catch((error: any) => {
        assignErrorToInput(updatePasswordForm.current, error?.STATUS);
      })
      .finally(() => setSaving(false));
  };

  // Add ref in form
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `User Profile`,
      children: (
        <Form
          layout="vertical"
          autoComplete="off"
          ref={profileForm}
          form={form}
          id="publishForm"
          onFinish={handleSubmit}
          onChange={onChange}
          className="userProfile commanDrawer"
        >
          <Row className="iconRow">
            <div className="formIcon">
              <div className="borderIcon">
                <UserIcon />
              </div>
            </div>
          </Row>
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="First Name"
                name="name"
                rules={formRules.name()}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Last Name"
                name="last_name"
                rules={formRules.name()}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InputBox.Text
                name="email"
                label="Email ID"
                // disabled={[1].includes(userDetail?.users_roles_id)}
                placeholder="Enter Email"
                rules={formRules.email()}
                disabled={userDetail ? true : false}
              />
            </Col>
          </Row>
          <div className="profileBtn">
            <Button
              disabled={disabled}
              form="publishForm"
              loading={saving}
              htmlType="submit"
              type="primary"
              className={`${disabled ? "disableBtn" : "blackLineBtn"}`}
            >
              Save
            </Button>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: `Change Password`,
      children: (
        <Form
          layout="vertical"
          autoComplete="off"
          ref={updatePasswordForm}
          id="changePass"
          onChange={onPasswordChange}
          onFinish={updatePassword}
          // initialValues={LAYOUT.initialValues}
        >
          <Row className="iconRow">
            <div className="formIcon">
              <div className="borderIcon">
                <PasswordIcon />
              </div>
            </div>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <InputBox.Password
                required
                name="old_password"
                label="Old Password"
                placeholder="Enter old password"
                rules={formRules.password()}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Popover
                placement="topRight"
                content={passwordTooltip}
                open={tooltip}
                align={{ offset: [0, -70] }}
              >
                <InputBox.Password
                  name="new_password"
                  required
                  label="New Password"
                  placeholder="Enter new password"
                  rules={rules.new_password()}
                />
              </Popover>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InputBox.Password
                name="confirm_password"
                label="Confirm Password"
                required
                placeholder="Enter Confirm Password"
                rules={rules.confirm_password()}
              />
            </Col>
          </Row>
          <div className="profileBtn">
            <Button
              disabled={disabled}
              form="changePass"
              loading={saving}
              htmlType="submit"
              type="primary"
              className={`${disabled ? "disableBtn" : "blackLineBtn"}`}
            >
              Update Password
            </Button>
          </div>
        </Form>
      ),
    },
  ];

  const onChangeTab = () => {
    setTooltip(false);
    setDisabled(false);
    setSaving(false);
  };

  return (
    <div className="profileLayout ">
      <Tabs
        defaultActiveKey="1"
        moreIcon={false}
        items={items}
        onChange={onChangeTab}
      />
    </div>
  );
};

export default Profile;
