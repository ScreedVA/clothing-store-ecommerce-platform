import "./Body.css";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function Body() {
  return (
    <>
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth Components */}
        </Routes>
      </div>
    </>
  );
}
export default Body;
