import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect, useContext } from "react";
import { NavItemConfigModel } from "../../../../models/NavbarModel";
import { IconField } from "primeng/iconfield";
import { AuthContext } from "../../../../services/http/AuthService";

function Navbar() {
  const navigate = useNavigate();
  const { logout, signedIn } = useContext(AuthContext);
  const [navbarConfig, setNavbarConfig] = useState<NavItemConfigModel[]>([]);

  const [vwWidth, setVwWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [menuOpen, setMenuOpen] = useState(false);

  // Default navbar items
  const defaultNavbarConfig: NavItemConfigModel[] = [
    {
      itemName: "Login",
      onClick: () => {
        navigate("/auth/login");
      },
      navIcon: "fa-solid fa-right-to-bracket",
    },
    {
      itemName: "Register",
      onClick: () => {
        navigate("/auth/register");
      },
      navIcon: "fa-solid fa-user-plus",
    },
    {
      itemName: "Logout",
      navIcon: "fa-solid fa-person-walking-arrow-right",
      onClick: () => {
        logout();
      },
    },
    {
      navIcon: "fa-solid fa-cart-shopping",
    },
    {
      itemName: "Profile",
      navIcon: "fa-regular fa-user",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setVwWidth(window.innerWidth);
    };

    // Add event listener to update width on window resize
    window.addEventListener("resize", handleResize);

    // Configure Navbar Items
    const filteredConfig = defaultNavbarConfig.filter((item) => {
      if (signedIn) {
        // Exclude "Login" and "Register" if signed in
        return item.itemName !== "Login" && item.itemName !== "Register";
      } else {
        // Exclude "Logout" if not signed in
        return item.itemName !== "Logout" && item.itemName !== "Profile";
      }
    });

    setNavbarConfig(filteredConfig);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [signedIn]);

  return (
    <>
      <menu className="navbar-container">
        <div className="nav-logo">
          <h1 onClick={() => navigate("/")}>LOGO</h1>
        </div>
        <ul className="nav-list">
          {navbarConfig.map((navItem) => (
            <li className="nav-list-item">
              <a onClick={navItem.onClick}>
                <i className={navItem.navIcon}></i>
              </a>
            </li>
          ))}
        </ul>
      </menu>
    </>
  );
}
export default Navbar;

{
  /* <ul className="navbar-list right">
          <li className="navbar-list-item">

          </li>



            */
}
