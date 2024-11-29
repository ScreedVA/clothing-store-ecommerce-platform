import { FormBoxConfigModel } from "../../../../../../models/FormModels";
import "./LoginForm.css";

interface LoginFormProps {
  formConfig: FormBoxConfigModel[];
}
const LoginForm: React.FC<LoginFormProps> = ({ formConfig }) => {
  return (
    <>
      <div className="login-form-container">
        <form action="" className="form-grid">
          {formConfig.map((formBox) => (
            <div
              className="form-item-box"
              style={{ gridTemplateColumns: `repeat(${formBox.formFieldArray.length}) 1fr` }}
            >
              {formBox.formFieldArray.map((formField) => (
                <div className="form-item-field">
                  {/* Label Configuration */}
                  {formField.label && <label htmlFor={formField.label.for}>{formField.label.innerText}</label>}
                  {/* Input Configuration */}
                  {formField.input && (
                    <input
                      type={formField.input.type}
                      name={formField.input.name}
                      placeholder={formField.input.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </form>
      </div>
    </>
  );
};
export default LoginForm;
