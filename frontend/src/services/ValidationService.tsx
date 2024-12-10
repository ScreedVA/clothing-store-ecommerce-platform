import { FrontendRegisterRequestModel, POSTLoginRequestModel } from "../models/AuthModels";
import { ErrorLoginRequestModel, ErrorRegisterRequestModel } from "../models/ErrorModels";

export function validateLoginRequestModel(validationModel: POSTLoginRequestModel) {
  const errors: ErrorLoginRequestModel = {};

  if (!validationModel || !validationModel.username) errors.username = "Username is required";
  if (!validationModel || !validationModel.password) errors.password = "Password is required";

  return errors;
}

export function validateRegisterRequestModel(validationModel: FrontendRegisterRequestModel) {
  const errors: ErrorRegisterRequestModel = {};

  if (!validationModel || !validationModel.firstName) errors.firstName = "First Name is required";
  if (!validationModel || !validationModel.lastName) errors.lastName = "Last Name is required";
  if (!validationModel || !validationModel.email) errors.email = "Email is required";
  if (!validationModel || !validationModel.username) errors.username = "Username is required";
  if (!validationModel || !validationModel.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
  if (!validationModel || !validationModel.password) errors.password = "Password is required";
  if (!validationModel || !validationModel.passwordConfirm) errors.passwordConfirm = "Please confirm password";
  else if (validationModel.password !== validationModel.passwordConfirm) {
    errors.password = "Passwords does not match";
    errors.passwordConfirm = "Passwords does not match";
  }
  return errors;
}
