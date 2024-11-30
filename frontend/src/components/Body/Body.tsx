import "./Body.css";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function Body() {
  return (
    <>
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth Components */}
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />}></Route>
        </Routes>
      </div>
    </>
  );
}
export default Body;
