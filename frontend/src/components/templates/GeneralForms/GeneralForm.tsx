import { useEffect, useState } from "react";
import "./GeneralForm.css";
import { useNavigate } from "react-router-dom";
import { ButtonConfigModel, AnchorConfigModel } from "../../../models/ButtonModels";
import { FormBoxConfigModel } from "../../../models/FormModels";
import Button from "../Button/Button";
import { LoginRequestModel } from "../../../models/AuthModels";
import { ErrorLoginRequestModel } from "../../../models/ErrorModels";

interface GeneralFormProps {
  formConfig: FormBoxConfigModel[];
  formSubmitBtnConfig: ButtonConfigModel;
  formAnchorConfig: AnchorConfigModel;
  submitForm: (input: any) => void;
  formDetails?: LoginRequestModel;
  setFormDetails?: (input: any) => void;
  errors?: ErrorLoginRequestModel;
  formHeading?: string;
  formSubheading?: string;
  formWidth?: string;
  formWidthAlt?: string;
  formBorder?: string;
}

const GeneralForm: React.FC<GeneralFormProps> = ({
  formConfig,
  formSubmitBtnConfig,
  formAnchorConfig,
  submitForm,
  formDetails,
  setFormDetails,
  errors,
  formHeading,
  formSubheading,
  formWidth,
  formWidthAlt,
  formBorder,
}) => {
  const [vwWidth, setVwWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  function handleFormFieldChange(e: any) {
    const { name, value } = e.target;
    if (setFormDetails) {
      setFormDetails((prevFields: any) => {
        return {
          ...prevFields,
          [name]: value,
        };
      });
    } else {
      console.log("setFormDetails function is undefined");
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setVwWidth(window.innerWidth);
    };

    // Add event listener to update width on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className="general-form-container"
        style={{ ...(formWidth && formWidthAlt ? { width: vwWidth > 1500 ? formWidth : formWidthAlt } : {}) }}
      >
        <form onSubmit={submitForm} className="form-grid" style={{ ...(formBorder ? { border: formBorder } : {}) }}>
          <h2 className="general-form-heading">{formHeading}</h2>
          <h4 className="general-form-subheading">{formSubheading}</h4>

          {formConfig.map((formBox, index) => (
            <div
              key={`${formBox}-${index}`}
              className="form-item-box"
              style={{ gridTemplateColumns: `repeat(${formBox.formFieldArray.length}, 1fr)` }}
            >
              {/* Form Fields Configuration */}
              {formBox.formFieldArray.map((formField, index) => (
                <div className="form-item-field" key={`${formField}-${index}`}>
                  {/* Label Configuration */}
                  {formField.label && <label htmlFor={formField.label.for}>{formField.label.innerText}</label>}
                  {/* Input Configuration */}
                  {formField.input && (
                    <input
                      type={formField.input.type}
                      name={formField.input.name}
                      // Configure inputValue to loginDetails
                      value={(() => {
                        let inputName: string = formField.input.name;
                        let formDetailsAny: any = formDetails;
                        let objectValue =
                          formDetails && Object.keys(formDetails).find((key) => key === inputName)
                            ? formDetailsAny[inputName]
                            : "";
                        return objectValue;
                      })()}
                      placeholder={formField.input.placeholder}
                      onChange={handleFormFieldChange}
                    />
                  )}
                  {/* Select Configuration */}
                  {formField.select && (
                    <select name={formField.select.name}>
                      {/* Option Configuration */}
                      {formField.select.optionsConfigArray.map((option) => (
                        <option value={option.value}>{option.innerText}</option>
                      ))}
                    </select>
                  )}
                  {(() => {
                    let fieldName: string = formField.label?.for;

                    // Configure error messagees
                    let errorsAny: any = errors || {};
                    let errorKey = Object.keys(errorsAny).find((key) => key === fieldName) || "";
                    let errorMsg = (errors && errorsAny[errorKey]) || "";
                    return <small style={{ color: "red" }}>{errorMsg}</small>;
                  })()}
                </div>
              ))}
            </div>
          ))}
          <Button {...formSubmitBtnConfig} />
          <span className="redirect-link-container">
            <p>{formAnchorConfig.anchorText}</p>
            <a onClick={() => navigate(formAnchorConfig.anchorNavUrl)}>
              <p style={{ textDecoration: "underline", color: "black" }}>Click Here</p>
            </a>
          </span>
        </form>
      </div>
    </>
  );
};
export default GeneralForm;
