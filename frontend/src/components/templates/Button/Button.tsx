import React, { useEffect, useState } from "react";
import "./Button.css";
import { ButtonConfigModel } from "../../../models/ButtonModels";

interface ButtonProps extends ButtonConfigModel {}

const Button: React.FC<ButtonProps> = ({
  btnText,
  colorContrastConfig,
  btnBorder,
  btnBorderRadius,
  btnPadding,
  btnOnClick,
  btnType,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="btn-container">
      <button
        type={btnType || undefined}
        style={{
          ...(btnBorder ? { border: btnBorder } : {}), // Control Custom Border Style

          ...(colorContrastConfig // Control Custom Hover Behavior
            ? {
                background: `linear-gradient(to right, ${colorContrastConfig.altColor} 50%, ${colorContrastConfig.baseColor} 50%)`,
                backgroundSize: "200% 100%",
                backgroundPosition: isHovered ? "100% 0" : "0 0",
                color: isHovered ? colorContrastConfig.altColor : colorContrastConfig.baseColor,
              }
            : {}),

          // Button Radius Configuration
          ...(btnBorderRadius ? { borderRadius: btnBorderRadius } : {}),

          // Button Padding Configuration
          ...(btnPadding ? { padding: btnPadding } : {}),
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;
