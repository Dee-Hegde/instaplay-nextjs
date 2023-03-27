import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Button, Input, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { loginProcess, requestTokenProcess } from "@/http-helpers/login/login";
import { notify, notifyErr } from "@/utils/commonFunctions";
import { LoginErrorHandler, LoginResponse } from "@/model/Login";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const [requestedToken, setRequestedToken] = useState("");
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<LoginErrorHandler>({
    userNameError: null,
    passwordError: null,
  });

  const getTokenRequest = async (): Promise<void> => {
    const temp: LoginResponse = await requestTokenProcess();
    localStorage.setItem("token", temp?.request_token);
    setRequestedToken(temp?.request_token);
    setIsloading(false);
  };

  const handleLoginProcess = async (): Promise<void> => {
    if (username && password && password.length >= 4 && requestedToken) {
      const data: {
        username: string;
        password: string;
        request_token: string;
      } = {
        username: username,
        password: password,
        request_token: requestedToken,
      };
      try {
        const temp: LoginResponse = await loginProcess(data);
        if (temp?.success === true) {
          localStorage.setItem("accessToken", `${temp?.success}`);
          notify("Login Success");
          router.push("/dashboard");
        } else {
          notifyErr("Something went wrong.");
        }
      } catch (err) {
        notifyErr("Failed");
      }
    } else {
      let err1: string | null = null;
      let err2: string | null = null;
      if (username.trim() === "") {
        err1 = "Enter valid username";
      }
      if (password.trim() === "" || password.length < 4) {
        err2 = "Enter valid password";
      }

      setError({ ...error, userNameError: err1, passwordError: err2 });
    }
  };
  useEffect(() => {
    getTokenRequest();
    const accessToken: string | null = localStorage.getItem("accessToken");
    if (accessToken === "true") {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className={styles.main}>
      {isLoading ? (
        <div className="spin">
          <Spin size="large" tip="Please wait..."></Spin>
        </div>
      ) : (
        <>
          <div className="login-container">
            <h2>Sign in</h2>
            <p>Sign in to your Self Service Portal</p>
            <div className="input-div">
              <Input
                onChange={(e): void => {
                  setUsername(e.target.value);
                  setError({ ...error, userNameError: null });
                }}
                value={username}
                placeholder="Username"
              />
              {error.userNameError && (
                <p className="err err1">{error.userNameError}</p>
              )}
            </div>
            <div className="input-div">
              <Input.Password
                value={password}
                onChange={(e): void => {
                  setPassword(e.target.value);
                  setError({ ...error, passwordError: null });
                }}
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {error.passwordError && (
                <p className="err err1">{error.passwordError}</p>
              )}
            </div>

            <Button onClick={handleLoginProcess} type="primary" block>
              Login
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
