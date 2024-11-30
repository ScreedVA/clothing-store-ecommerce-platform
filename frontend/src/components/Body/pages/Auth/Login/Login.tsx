import "./Login.css";
import { useState } from "react";
import { FormBoxConfigModel, FormFieldElementsEnum, FormInputTypesEnum } from "../../../../../models/FormModels";
import { AnchorConfigModel, ButtonConfigModel } from "../../../../../models/ButtonModels";
import GeneralForm from "../../../../templates/GeneralForms/GeneralForm";
import { LoginRequestModel } from "../../../../../models/AuthModels";
import { ErrorLoginRequestModel } from "../../../../../models/ErrorModels";
import { validateLoginRequestModel } from "../../../../../services/ValidationService";

function Login() {
  // Login Form Configuration
  const [loginFormConfig] = useState<FormBoxConfigModel[]>([
    {
      formFieldArray: [
        {
          label: {
            elementType: FormFieldElementsEnum.LABEL,
            for: "username",
            innerText: "Username",
          },
          input: {
            elementType: FormFieldElementsEnum.INPUT,
            name: "username",
            placeholder: "Username",
            type: FormInputTypesEnum.TEXT,
          },
        },
      ],
    },
    {
      formFieldArray: [
        {
          label: {
            elementType: FormFieldElementsEnum.LABEL,
            for: "password",
            innerText: "Password",
          },
          input: {
            elementType: FormFieldElementsEnum.INPUT,
            name: "password",
            placeholder: "Password",
            type: FormInputTypesEnum.PASSWORD,
          },
        },
      ],
    },
  ]);
  const [loginBtnConfig] = useState<ButtonConfigModel>({
    btnText: "Submit",
    btnBorder: "1px solid black",
    btnBorderRadius: "0px",
    btnPadding: "10px 0px",
    btnType: "submit",
  });
  const [loginAnchorConfig] = useState<AnchorConfigModel>({
    anchorNavUrl: "/auth/register",
    anchorText: "Not Registered",
  });

  // Http Request and Validation Handling
  const [loginDetails, setLoginDetails] = useState<LoginRequestModel>({
    username: "Test Username",
    password: "Test Password",
  });
  const [errors, setErrors] = useState<ErrorLoginRequestModel>();

  const submitLogin = async (event: any) => {
    event.preventDefault();
    // const response: Response
    const validationErrors: ErrorLoginRequestModel = validateLoginRequestModel(loginDetails!);
    setErrors(validationErrors);
  };

  return (
    <>
      <div className="login-container">
        <GeneralForm
          formConfig={loginFormConfig}
          formSubmitBtnConfig={loginBtnConfig}
          formAnchorConfig={loginAnchorConfig}
          submitForm={submitLogin}
          // Optional Props
          errors={errors}
          formHeading={"Welcome Back"}
          formSubheading={"Please Enter Your Details"}
          formWidth={"600px"}
          formWidthAlt={"450px"}
          formBorder={"1px solid gray"}
          formDetails={loginDetails}
          setFormDetails={setLoginDetails}
        />
      </div>
    </>
  );
}
export default Login;
