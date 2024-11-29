import "./Navbar.css";
function Navbar() {
  return (
    <>
      <menu className="navbar-container">
        <ul className="navbar-list left">
          <li className="navbar-list-item">
            <h2>LOGO</h2>
          </li>
          <li className="navbar-list-item">
            <a href="#">Shop</a>
          </li>
          <li className="navbar-list-item">
            <a href="#">New Clothes</a>
          </li>
          <li className="navbar-list-item">
            <a href="#">Top Clothes</a>
          </li>
          <li className="navbar-list-item">
            <a href="">Brands</a>
          </li>
        </ul>
        <ul className="navbar-list right">
          <li className="navbar-list-item">
            <i className="fa-solid fa-cart-shopping"></i>
          </li>
          <li className="navbar-list-item">
            <i className="fa-regular fa-user"></i>
          </li>
        </ul>
      </menu>
    </>
  );
}
export default Navbar;
