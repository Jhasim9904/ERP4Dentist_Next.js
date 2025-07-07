"use client";
import React, { useState } from "react";
import "./Signup.css";
import Link from "next/link";
import eyes from "../images/eyes.png";
import Image from "next/image";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="rightside">
      <div className="custom-design">
        <div>
          <div
            style={{ color: "#2B8CFF", fontWeight: "bold", fontSize: "20px" }}
          >
            Signup for a 30 day free trial!
          </div>
          <div
            className="d-flex"
            style={{ fontWeight: "normal", fontSize: "17px" }}
          >
            Already have an account?
            <Link className="nav-link mx-1" href="/login">
              Login
            </Link>
          </div>
        </div>

        <form>
          <div className="form-row custom-form">
            <div className="form-group col-md-11 mt-4">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="form-control form1"
                name="fullName"
                onChange={handleChange}
                />
            </div>

            <div className="form-group col-md-11 mt-3">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="text"
                className="form-control form1"
                name="mobile"
                onChange={handleChange}
                />
            </div>
            </div>

            <div className="form-group col-md-11 mt-3">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control form1"
                name="email"
                onChange={handleChange}
              />
            </div>

          <div className="row mt-4">
            <div className="form-group col-md-5">
              <label htmlFor="password">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form1 pe-5"
                  name="password"
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
                    transform: "translateY(-60%)",
                  }}
                >
                  <Image
                    src={eyes}
                    alt="Decorative Rectangle"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="confirmPassword">Confirm Your Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form1 pe-5"
                  name="confirmPassword"
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
                    transform: "translateY(-60%)",
                  }}
                >
                  <Image
                    src={eyes}
                    alt="Decorative Rectangle"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 mb-3" style={{ fontSize: "13px", color: "#000" }}>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>

          <div className="form-group mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                style={{ border: "1px solid grey" }}
              />
              <label
                className="form-check-label"
                htmlFor="gridCheck"
                style={{ color: "black" }}
              >
                By creating an account, you agree to our terms and privacy
                policy
              </label>
            </div>
          </div>

          <Link className="nav-link mx-1 mt-4" href="/dashboard">
            <button
              style={{ width: "95%" }}
              type="submit"
              className="btn btn-primary"
            >
              Get OTP And Continue
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
