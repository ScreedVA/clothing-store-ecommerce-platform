interface ColorContrastConfigModel {
  baseColor: string;
  altColor: string;
}

export interface ButtonConfigModel {
  btnText: string;
  btnType?: "submit" | "reset" | "button";
  colorContrastConfig?: ColorContrastConfigModel;
  btnBorderRadius?: string;
  btnBorder?: string;
  btnPadding?: string;
  btnOnClick?: (e: any) => void;
  disableBackgroundContrastHover?: boolean;
  invertBackgroundColor?: boolean;
  btnWidth?: string;
  btnTransition?: string;
  // Tab Configuration
}

export interface AnchorConfigModel {
  anchorText: string;
  anchorNavUrl: string;
}
