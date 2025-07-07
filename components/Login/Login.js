"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import eyes from "../images/eyes.png";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <div>
          <div style={{ color: "#2B8CFF", fontWeight: "bold", fontSize: "20px" }}>
            Welcome Back to ERP4Dentist
          </div>
          <div className="d-flex" style={{ fontWeight: "normal", fontSize: "17px" }}>
            Simplify your dental practice — all tools in one place.
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="login-form mt-4">
            <div className="form-group col-md-11 login-input">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control form2"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-row mt-4 login-input">
              <div className="form-group col-md-11">
                <label htmlFor="password">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5 form2"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={togglePassword}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Image
                      src={eyes}
                      alt="Toggle Password"
                      width={20}
                      height={20}
                    />
                  </span>
                </div>

                <Link href="/" className="nav-link mx-1 my-1" style={{ color: "#2B8CFF" }}>
                  Forget Password?
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex" style={{ fontWeight: "normal", fontSize: "17px" }}>
            Don’t have an account?
            <Link className="nav-link mx-1" href="/">
              Sign up
            </Link>
          </div>

          <div style={{ fontSize: "13px", marginTop: "10px" }}>
            This page is protected by Google reCAPTCHA to ensure you're not a bot
          </div>
          <div style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>
            Learn more
          </div>

          <Link href="/dashboard" className="nav-link mx-1 mt-4">
            <button
              style={{ width: "95%" }}
              type="submit"
              className="btn btn-primary my-4"
            >
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
