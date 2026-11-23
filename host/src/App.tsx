import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";



const ProductList = lazy(() => import("products/ProductList"));
const Cart = lazy(() => import("cart/Cart"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <strong className="brand">Healthcare</strong>
          <nav className="nav">
            <NavLink
              to={"/"}
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/products"}
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Products
            </NavLink>
            <NavLink
              to={"/cart"}
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Cart
            </NavLink>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <section className="panel">
                  <h1>Home (Host/Shell)</h1>
                  <p>Welcome to our Healthcare Platform, a unified digital experience designed to simplify healthcare management. Explore healthcare services, manage patient information, schedule appointments, track visits, and access essential healthcare resources through a seamless, secure, and user-friendly interface.</p>
                </section>
              }
            />
            <Route
              path="/products"
              element={
                <Suspense
                  fallback={
                    <p className="loading">Loading products remote...</p>
                  }
                >
                  <ProductList />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense
                  fallback={<p className="loading">Loading cart remote...</p>}
                >
                  <Cart />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
