import "./Button.css";

interface ButtonProps {
  btnText: string;
}

const Button: React.FC<ButtonProps> = ({ btnText }) => {
  return (
    <>
      <div className="btn-container">
        <button>{btnText}</button>
      </div>
    </>
  );
};
export default Button;
