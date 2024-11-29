import LogoBanner from "../templates/LogoBanner/LogoBanner";
import "./Body.css";
import Home from "./pages/Home/Home";

function Body() {
  return (
    <>
      <div className="body-container">
        <div id="home">
          <Home />
        </div>
      </div>
    </>
  );
}
export default Body;
