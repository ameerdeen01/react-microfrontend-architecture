
import { lazy, Suspense } from "react";
import "./App.css";

import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./auth/AuthProvider";

const ProductList = lazy(() => import("products/ProductList"));
const Cart = lazy(() => import("cart/Cart"));

function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="header">
        <strong className="brand">Healthcare</strong>

        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Cart
          </NavLink>
        </nav>

        <div className="user-info">
          <span>
            Welcome, <strong>{user?.name}</strong>
          </span>

          <span className="user-role"> | {user?.role}</span> &nbsp;&nbsp;

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <section className="panel">
                <h1>Home (Host/Shell)</h1>

                <p>
                  Welcome to our Healthcare Platform, a unified digital
                  experience designed to simplify healthcare management.
                  Explore healthcare services, manage patient information,
                  schedule appointments, track visits, and access essential
                  healthcare resources through a seamless, secure, and
                  user-friendly interface.
                </p>

                <h3>Logged-in User Details</h3>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Page */}
        <Route path="/login" element={<Login />} />

        {/* All other pages require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<DashboardLayout />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
