import "./Login.css";
import { useContext, useState } from "react";
import { FormBoxConfigModel, FormFieldElementsEnum, FormInputTypesEnum } from "../../../../../models/FormModels";
import { AnchorConfigModel, ButtonConfigModel } from "../../../../../models/ButtonModels";
import GeneralForm from "../../../../templates/GeneralForms/GeneralForm";
import { POSTLoginRequestModel } from "../../../../../models/AuthModels";
import { ErrorLoginRequestModel } from "../../../../../models/ErrorModels";
import { validateLoginRequestModel } from "../../../../../services/ValidationService";
import { AuthContext, POSTLoginRequest } from "../../../../../services/http/AuthService";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
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
  const [loginDetails, setLoginDetails] = useState<POSTLoginRequestModel>();

  const [errors, setErrors] = useState<ErrorLoginRequestModel>();

  const submitLogin = async (event: any) => {
    event.preventDefault();
    // const response: Response
    const validationErrors: ErrorLoginRequestModel = validateLoginRequestModel(loginDetails!);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && loginDetails) {
      const formData = new URLSearchParams();
      formData.append("username", loginDetails.username);
      formData.append("password", loginDetails.password);

      const response: Response = await POSTLoginRequest(formData);
      const tokenResponse: { access_token: string; refresh_token: string } = await response.json();
      login(tokenResponse.access_token, tokenResponse.refresh_token);
      navigate("/");
    }
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
