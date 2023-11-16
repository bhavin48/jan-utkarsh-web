import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "antd";
// import { useNavigate } from "react-router-dom";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import LoginBG from "../../../../assets/images/apps/login-pattern.png";
import { LoginRequest } from "../rules";
import { doLogin } from "../../../../store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { stringDecryption } from "../../../../config/Global";
import { assignErrorToInput } from "../../../../store/api";
import { useAppDispatch, useAppSelector } from "../../../../store/app";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    data.remember = rememberMe;
    dispatch(doLogin(data))
      .then(() => {
        navigate("/");
      })
      .catch((error: any) => {
        assignErrorToInput(form, error?.STATUS);
      });
  };

  useEffect(() => {
    let rememberMe: any = localStorage.getItem("remember_me");
    if (rememberMe) {
      rememberMe = JSON.parse(stringDecryption(rememberMe));
      form.setFieldsValue({
        username: rememberMe.email,
        password: rememberMe.password,
        remember: true,
      });
      setRememberMe(true);
    }
  }, [form]);

  return (
    <div className="loginForm" style={{ backgroundImage: `url(${LoginBG})` }}>
      <div className="loginFormWrap">
        <div className="formTitle">
          <h2>Welcome </h2>
        </div>
        <FormBox form={form} onFinish={handleSubmit}>
          <InputBox.Text
            name="username"
            label={"Email ID"}
            placeholder="example@domain.com"
            rules={LoginRequest().email("Email ID")}
          />
          <InputBox.Password
            name="password"
            label="Password"
            placeholder="xxxxxxx"
            rules={LoginRequest().password("Password")}
          />
          <div className="text-center">
            <Button loading={isLoading} type="primary" htmlType="submit">
              Login
            </Button>
          </div>
          <div
            className="mt-10 font-medium login_extra_fields"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Checkbox
              name="remember_me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            >
              Remember me
            </Checkbox>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </FormBox>
      </div>
    </div>
  );
};

export default LoginForm;
