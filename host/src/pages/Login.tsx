
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@healthcare.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/", { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-logo">M</span>
          <h1>Healthcare</h1>
          <h6>Unified Micro Frontend Platform</h6>
        </div>

        <h2>Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">Sign In</button>
        </form>

        <div className="demo-accounts">
          <h3>Demo Accounts</h3>
          <p>Admin: admin@healthcare.com / Admin@123</p>
          <p>User: user@healthcare.com / User@123</p>
        </div>
      </div>
    </div>
  );
}
