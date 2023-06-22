import { useState } from "react";
import "./App.css";
import Shop from "./components/Shop";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <div className="navbar">
          <a href="index.html">
            <h2>Clothing Store</h2>
          </a>

          <a href="cart.html">
            <div className="cart">
              <i className="bi bi-bag-heart"></i>
              <div id="cartAmount" className="cartAmount">
                0
              </div>
            </div>
          </a>
        </div>

        <Shop />
      </nav>
    </>
  );
}

export default App;
