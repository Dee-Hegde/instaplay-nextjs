import { loginData, LoginResponse } from "@/model/Login";
import axios from "axios";
import { urlContainer } from "../urlContainer";

export const requestTokenProcess = async (): Promise<LoginResponse> => {
  const response = await axios.get(urlContainer.requestToken);
  return response?.data;
};

export const loginProcess = async (
  data: loginData
): Promise<LoginResponse> => {
  const response = await axios.post(urlContainer.login, data);
  return response?.data;
};
