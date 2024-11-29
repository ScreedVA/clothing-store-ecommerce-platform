import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="footer-container">
        <ul className="footer-list">
          <li className="footer-list-item title">
            <h4>COMPANY</h4>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>About</p>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>Feature</p>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>Works</p>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>Career</p>
            </a>
          </li>
        </ul>
        <ul className="footer-list">
          <li className="footer-list-item title">
            <h4>HELP</h4>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>Customer Support</p>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>Delivery Date</p>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>Terms & Conditions</p>
            </a>
          </li>
          <li className="footer-list-item">
            <a href="">
              <p>Privacy Policy</p>
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
export default Footer;
