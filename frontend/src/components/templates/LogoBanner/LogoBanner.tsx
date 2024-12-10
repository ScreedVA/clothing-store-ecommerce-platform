import "./LogoBanner.css";
import { logoBannerModel } from "../../../models/LogoBannerModels";

interface LogoBannerProps {
  logoImgList: string[];
}

const LogoBanner: React.FC<LogoBannerProps> = ({ logoImgList }) => {
  return (
    <>
      <div className="logo-banner-container">
        {logoImgList.map((img, index) => (
          <img key={index} className="logo-img" src={img} alt="" />
        ))}
      </div>
    </>
  );
};
export default LogoBanner;
