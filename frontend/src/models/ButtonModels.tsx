interface ColorContrastConfigModel {
  baseColor: string;
  altColor: string;
}

export interface ButtonConfigModel {
  btnText: string;
  colorContrastConfig?: ColorContrastConfigModel;
  btnBorderRadius?: string;
  btnBorder?: string;
  btnPadding?: string;
  btnType?: "submit" | "reset" | "button";
  btnOnClick?: (e: any) => void;
}

export interface AnchorConfigModel {
  anchorText: string;
  anchorNavUrl: string;
}
