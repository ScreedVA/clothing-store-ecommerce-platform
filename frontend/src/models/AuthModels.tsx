export interface POSTLoginRequestModel {
  username: string;
  password: string;
}

export interface POSTRegisterRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface FrontendRegisterRequestModel extends POSTRegisterRequestModel {
  passwordConfirm: string;
}

export interface POSTRefreshTokenSchema {
  refreshToken: string;
  tokenType: string;
}
