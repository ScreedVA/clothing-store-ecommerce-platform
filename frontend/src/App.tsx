import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Body />
        <Footer />
      </Router>
    </>
  );
}

export default App;
