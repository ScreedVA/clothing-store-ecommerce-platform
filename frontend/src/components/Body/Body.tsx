import "./Body.css";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

function Body() {
  return (
    <>
      <div className="body-container">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          {/* Auth Components */}
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />}></Route>
        </Routes>
      </div>
    </>
  );
}
export default Body;
