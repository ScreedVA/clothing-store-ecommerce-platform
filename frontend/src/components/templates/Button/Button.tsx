import React, { useEffect, useState } from "react";
import "./Button.css";

interface ButtonProps {
  btnText: string;
  borderConfig?: string;
  colorContrastConfig?: { baseColor: string; altColor: string };
}

const Button: React.FC<ButtonProps> = ({ btnText, borderConfig, colorContrastConfig }) => {
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
        style={{
          ...(borderConfig ? { border: borderConfig } : {}), // Control Custom Border Style
          ...(colorContrastConfig // Control Custom Hover Behavior
            ? {
                background: `linear-gradient(to right, ${colorContrastConfig.altColor} 50%, ${colorContrastConfig.baseColor} 50%)`,
                backgroundSize: "200% 100%",
                backgroundPosition: isHovered ? "100% 0" : "0 0",
                color: isHovered ? colorContrastConfig.altColor : colorContrastConfig.baseColor,
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
