import { LoginRequestModel, RegisterRequestModel } from "../models/AuthModels";
import { ErrorLoginRequestModel, ErrorRegisterRequestModel } from "../models/ErrorModels";

export function validateLoginRequestModel(validationModel: LoginRequestModel) {
  const errors: ErrorLoginRequestModel = {};

  if (!validationModel.username) errors.username = "Username is required";
  if (!validationModel.password) errors.password = "Password is required";

  return errors;
}

export function validateRegisterRequestModel(validationModel: RegisterRequestModel) {
  const errors: ErrorRegisterRequestModel = {};

  if (!validationModel.firstName) errors.firstName = "First Name is required";
  if (!validationModel.lastName) errors.lastName = "Last Name is required";
  if (!validationModel.email) errors.email = "Email is required";
  if (!validationModel.username) errors.username = "Username is required";
  if (!validationModel.password) errors.password = "Password is required";

  return errors;
}
