import { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default App;
