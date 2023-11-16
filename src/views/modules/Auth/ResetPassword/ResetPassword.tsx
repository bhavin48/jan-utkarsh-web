import React, { useState } from "react";
import { Button, Form, Popover } from "antd";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import LoginBanner from "../../../../assets/images/apps/login-image.png";
import LoginBG from "../../../../assets/images/apps/login-pattern.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginRequest } from "../rules";
import { assignErrorToInput } from "../../../../store/api";
import { updatePassword } from "../../../../store/AuthSlice";
import { useAppDispatch } from "../../../../store/app";

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState(false);
  const navigate = useNavigate();
  const { otp }: any = useParams();

  const resetPassword = (data: any) => {
    localStorage.removeItem("token");
    setSaving(true);
    dispatch(updatePassword(otp, data))
      .then(() => {
        navigate("/login");
      })
      .catch((error: any) => {
        assignErrorToInput(form, error?.STATUS);
      })
      .finally(() => setSaving(false));
  };

  const onChange = () => {
    form
      .validateFields(["password"])
      .then(() => {
        setTooltip(false);
      })
      .catch(() => {
        setTooltip(true);
      });
  };

  // password criteria tool tip
  const passwordTooltip = (
    <div>
      <div>at least 1 numeric character</div>
      <div>at least 1 special character</div>
      <div>at least 1 uppercase letter</div>
      <div>at least 8 character</div>
    </div>
  );

  return (
    <section className="loginSection">
      <div className="loginWrap">
        <div className="loginLogo">
          <div className="loginBanner">
            <img src={LoginBanner} alt="Banner" />
          </div>
        </div>
        <div
          className="loginForm"
          style={{ backgroundImage: `url(${LoginBG})` }}
        >
          <div className="loginFormWrap">
            <div className="formTitle">
              <h2>Reset Password</h2>
            </div>
            <FormBox form={form} onFinish={resetPassword} onChange={onChange}>
              <Popover
                placement="topRight"
                content={passwordTooltip}
                open={tooltip}
              >
                <InputBox.Password
                  name="password"
                  label="Password"
                  placeholder="xxxxxxx"
                  rules={LoginRequest().password()}
                />
              </Popover>
              <InputBox.Password
                name="password_confirmation"
                label="Confirm Password"
                placeholder="xxxxxxx"
                rules={LoginRequest().confirmPassword()}
              />
              <div className="text-center resetPassword">
                <Button loading={saving} type="primary" htmlType="submit">
                  Reset Password
                </Button>
              </div>
              <div className="text-right mt-10 font-medium text-white">
                <Link to="/login">Back to login</Link>
              </div>
            </FormBox>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
