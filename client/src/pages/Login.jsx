import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="page-center">
      <form className="app-card" onSubmit={handleLogin}>

        <div className="app-title">Welcome back!</div>
        <div className="app-subtitle">
          Sign in to your workspace
        </div>

        <div className="form-field">
          <input
            type="email"
            className="app-input"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <button className="app-btn">Continue</button>

        <div className="center-footer">
          Don’t have an account? <Link to="/register" className="app-link">Create one</Link>
        </div>

      </form>
    </div>
  );
}
