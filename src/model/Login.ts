export interface LoginResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}
export interface loginData {
  username: string;
  password: string;
  request_token: string;
}
export interface LoginErrorHandler {
  userNameError: string | null;
  passwordError: string | null;
}
