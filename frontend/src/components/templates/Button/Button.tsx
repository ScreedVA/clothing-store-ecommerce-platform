import React, { useEffect, useState } from "react";
import "./Button.css";
import { ButtonConfigModel } from "../../../models/ButtonModels";

interface ButtonProps extends ButtonConfigModel {}

const Button: React.FC<ButtonProps> = ({
  btnText,
  btnBorder,
  btnBorderRadius,
  btnPadding,
  btnOnClick,
  btnWidth,
  btnTransition,
  invertBackgroundColor = false,
  colorContrastConfig = { altColor: "white", baseColor: "black" },
  btnType = undefined,
  disableBackgroundContrastHover = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`btn-container `}>
      <button
        onClick={btnOnClick && btnOnClick}
        type={btnType}
        style={{
          // Configure Custom Border Style
          ...(btnBorder ? { border: btnBorder } : {}),

          // Configure CUstom Button Width
          ...(btnWidth ? { width: btnWidth } : {}),

          // Control Custom Hover Color Behavior
          ...{
            background: `linear-gradient(to right, ${colorContrastConfig.altColor} 50%, ${colorContrastConfig.baseColor} 50%)`,
            backgroundSize: "250% 100%",
            backgroundPosition: isHovered && !disableBackgroundContrastHover ? "0 0" : "100% 0",
            color:
              isHovered && !disableBackgroundContrastHover
                ? colorContrastConfig.baseColor
                : colorContrastConfig.altColor,
          },

          // Button Radius Configuration
          ...(btnBorderRadius ? { borderRadius: btnBorderRadius } : {}),

          // Button Padding Configuration
          ...(btnPadding ? { padding: btnPadding } : {}),

          // Configure Custom Button Transition
          ...(btnTransition ? { transition: btnTransition } : {}),

          // Configure Button Tab Selection Settings
          ...(invertBackgroundColor
            ? {
                backgroundPosition: "0 0",
                color: colorContrastConfig.baseColor,
              }
            : {}),
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
