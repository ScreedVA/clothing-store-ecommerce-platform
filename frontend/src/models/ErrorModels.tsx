import { FrontendRegisterRequestModel, POSTLoginRequestModel, POSTRegisterRequestModel } from "./AuthModels";

export interface ErrorLoginRequestModel extends Partial<POSTLoginRequestModel> {}

export interface ErrorRegisterRequestModel extends Partial<FrontendRegisterRequestModel> {}
