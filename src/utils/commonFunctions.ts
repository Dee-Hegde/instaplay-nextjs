import { notification } from "antd";

export const getToken = (name: string): string | null => {
  const token: string | null = localStorage.getItem(name);
  return token;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToken = (token?: any): void => {
  localStorage.setItem("token", token);
};

export const notify = (msg: string): void => {
  notification["success"]({
    message: msg,
    placement: "bottomLeft",
  });
};
export const notifyErr = (msg: string): void => {
  notification["error"]({
    message: msg,
    placement: "bottomLeft",
  });
};
