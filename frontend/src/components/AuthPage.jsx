import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn as reduxSignIn } from "../store/store"
import { signIn, signUp } from "../services/api";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: "", email: "", password: "" }); 
    setError(null); 
    setSuccess(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp({ name: formData.name, email: formData.email, password: formData.password });
        setSuccess("Account created successfully! Please sign in.");
        toggleAuthMode();
      } else {
        const { data } = await signIn({ email: formData.email, password: formData.password });
        setSuccess("Sign-in successful!!");
        localStorage.setItem("token", data["access token"]);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isSignUp ? "Create an Account !!" : "Welcome To DevTrack App !!"}</h1>
      <p>{isSignUp ? "Join Today to organize your tasks" : "Sign in to manage your tasks"}</p>

      {/* Display success or error messages */}
      {success && <p className="success">{success}</p>}
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
