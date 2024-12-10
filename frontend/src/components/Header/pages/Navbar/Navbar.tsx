import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect, useContext, useRef } from "react";
import { NavItemConfigModel } from "../../../../models/NavbarModel";
import { IconField } from "primeng/iconfield";
import { AuthContext } from "../../../../services/http/AuthService";

function Navbar() {
  const navigate = useNavigate();
  const { logout, signedIn } = useContext(AuthContext);
  const [navbarConfig, setNavbarConfig] = useState<NavItemConfigModel[]>([]);
  const navbarRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

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
        navigate("/auth/login");
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

  const updatePlaceholderHeight = () => {
    if (navbarRef.current && placeholderRef.current) {
      placeholderRef.current.style.height = `${navbarRef.current.offsetHeight}px`;
    }
  };

  useEffect(() => {
    // Configure Navbar Items
    updatePlaceholderHeight();
    // Add resize event listener
    window.addEventListener("resize", updatePlaceholderHeight);

    const filteredConfig = defaultNavbarConfig.filter((item) => {
      if (signedIn) {
        // Exclude "Login" and "Register" if signed in
        return item.itemName !== "Login" && item.itemName !== "Register";
      } else if (!signedIn) {
        // Exclude "Logout" if not signed in
        return item.itemName !== "Logout" && item.itemName !== "Profile";
      }

      return item;
    });
    setNavbarConfig(filteredConfig);

    return () => {
      window.removeEventListener("resize", updatePlaceholderHeight);
    };
  }, [signedIn, navbarRef]);

  return (
    <>
      <div ref={placeholderRef} className="navbar-placeholder"></div>
      <menu ref={navbarRef} className="navbar-container">
        <div className="nav-logo">
          <h1 onClick={() => navigate("/")}>LOGO</h1>
        </div>

        {/* Search Form Configuration */}
        <div className="nav-right">
          <div className="search-form-wrapper">
            <form>
              <input type="search" name="searchFilter" placeholder="Search" />
            </form>
          </div>

          {/* Navlist Configuration */}
          <ul className="nav-list">
            {navbarConfig.map((navItem, index) => (
              <li key={`${navItem}-${index}`} className="nav-list-item">
                <a onClick={navItem.onClick} title={navItem.itemName}>
                  <i className={navItem.navIcon}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
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
