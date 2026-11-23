import { useState } from "react";
import "./App.css";
import { addProductToCart } from "@microshop/cart-contract";

type Product = {
  id: string;
  name: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "General Consultation", price: 50 },
  { id: "p2", name: "Cardiology Consultation", price: 90 },
  { id: "p3", name: "Blood Test", price: 25 },
  { id: "p4", name: "Health Checkup", price: 120 },
  { id: "p5", name: "X-Ray Scan", price: 60 },
  { id: "p6", name: "Dental Consultation", price: 45 },
];

function App() {
  const [message, setMessage] = useState("");

  const addToCart = (product: Product) => {
    addProductToCart(product);
    setMessage(`Added "${product.name}"`);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">Products MFE · standalone</p>
          <h1>Products</h1>
        </div>
      </header>

      <main className="main">
        {message ? <p className="toast">{message}</p> : null}

        <div className="grid">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="card">
              <h2>{product.name}</h2>
              <p className="price">${product.price}</p>
              <button type="button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
