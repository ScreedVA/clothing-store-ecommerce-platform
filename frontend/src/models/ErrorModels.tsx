import { LoginRequestModel, RegisterRequestModel } from "./AuthModels";

export interface ErrorLoginRequestModel extends Partial<LoginRequestModel> {}

export interface ErrorRegisterRequestModel extends Partial<RegisterRequestModel> {}
