import React, { useState } from "react";
import { signIn, signUp } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: "", email: "", password: "" }); // Reset form
    setError(null); // Clear error
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp({ name: formData.name, email: formData.email, password: formData.password });
        toggleAuthMode(); // Switch to SignIn after successful SignUp
      } else {
        const { data } = await signIn({ email: formData.email, password: formData.password });
        localStorage.setItem("token", data["access token"]);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isSignUp ? "Create Account" : "Welcome To DevTrack App"}</h1>
      <p>{isSignUp ? "Join Today to organize your tasks" : "Sign in to manage your tasks"}</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>

      <p className="toggle-text">
        {isSignUp
          ? "Already have an account? "
          : "Don't have an account yet? "}
        <span className="toggle-link" onClick={toggleAuthMode}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
