import { useContext, useState } from "react";
import GeneralForm from "../../../../templates/GeneralForms/GeneralForm";
import "./Register.css";
import { FormBoxConfigModel, FormFieldElementsEnum, FormInputTypesEnum } from "../../../../../models/FormModels";
import { AnchorConfigModel, ButtonConfigModel } from "../../../../../models/ButtonModels";
import { ErrorRegisterRequestModel } from "../../../../../models/ErrorModels";
import { validateRegisterRequestModel } from "../../../../../services/ValidationService";
import { FrontendRegisterRequestModel } from "../../../../../models/AuthModels";
import { AuthContext, POSTRegisterRequest } from "../../../../../services/http/AuthService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [registerFormConfig] = useState<FormBoxConfigModel[]>([
    {
      formFieldArray: [
        {
          label: {
            elementType: FormFieldElementsEnum.LABEL,
            for: "firstName",
            innerText: "First Name",
          },
          input: {
            elementType: FormFieldElementsEnum.INPUT,
            name: "firstName",
            placeholder: "First Name",
            type: FormInputTypesEnum.TEXT,
          },
        },
        {
          label: {
            elementType: FormFieldElementsEnum.LABEL,
            for: "lastName",
            innerText: "Last Name",
          },
          input: {
            elementType: FormFieldElementsEnum.INPUT,
            name: "lastName",
            placeholder: "Last Name",
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
        {
          label: {
            elementType: FormFieldElementsEnum.LABEL,
            for: "email",
            innerText: "Email",
          },
          input: {
            elementType: FormFieldElementsEnum.INPUT,
            name: "email",
            placeholder: "Email",
            type: FormInputTypesEnum.TEXT,
          },
        },
        {
          label: {
            elementType: FormFieldElementsEnum.LABEL,
            for: "dateOfBirth",
            innerText: "Date Of Birth",
          },
          input: {
            elementType: FormFieldElementsEnum.INPUT,
            name: "dateOfBirth",
            placeholder: "Date Of Birth",
            type: FormInputTypesEnum.DATE,
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
        {
          label: {
            elementType: FormFieldElementsEnum.LABEL,
            for: "passwordConfirm",
            innerText: "Password Confirm",
          },
          input: {
            elementType: FormFieldElementsEnum.INPUT,
            name: "passwordConfirm",
            placeholder: "Password Confirm",
            type: FormInputTypesEnum.PASSWORD,
          },
        },
      ],
    },
  ]);
  const [registerBtnConfig] = useState<ButtonConfigModel>({
    btnText: "Submit",
    btnBorder: "1px solid black",
    btnBorderRadius: "0px",
    btnPadding: "10px 0px",
    btnType: "submit",
  });

  const [registerAnchorConfig] = useState<AnchorConfigModel>({
    anchorNavUrl: "/auth/login",
    anchorText: "Already Registered?",
  });

  // Http Request and Validation Handling
  const [registerDetails, setRegisterDetails] = useState<FrontendRegisterRequestModel>();
  const [errors, setErrors] = useState<ErrorRegisterRequestModel>();

  const submitRegister = async (event: any) => {
    event.preventDefault();
    // const response: Response
    const validationErrors: ErrorRegisterRequestModel = validateRegisterRequestModel(registerDetails!);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && registerDetails) {
      const response: Response = await POSTRegisterRequest(registerDetails);
      const tokenResponse: { access_token: string; refresh_token: string } = await response.json();
      login(tokenResponse.access_token, tokenResponse.refresh_token);
      navigate("/");
    }
  };

  return (
    <>
      <div className="register-container">
        <GeneralForm
          formConfig={registerFormConfig}
          formSubmitBtnConfig={registerBtnConfig}
          formAnchorConfig={registerAnchorConfig}
          submitForm={submitRegister}
          //   Optional Props
          errors={errors}
          formHeading={"Welcome"}
          formSubheading={"Please Enter Your Details To Register"}
          formWidth={"600px"}
          formWidthAlt={"100%"}
          formBorder={"1px solid gray"}
          formDetails={registerDetails}
          setFormDetails={setRegisterDetails}
        />
      </div>
    </>
  );
}
export default Register;
