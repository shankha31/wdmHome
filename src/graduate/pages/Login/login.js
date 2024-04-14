import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import url from "../../../globalUrl";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const validateForm = () => {
    let isError = false;
    const errors = {
      emailError: "",

      passwordError: "",
    };

    if (!formData.email) {
      isError = true;
      errors.emailError = "Email is required";
    }

    if (!formData.password) {
      isError = true;
      errors.passwordError = "Password is required";
    }

    setFormErrors(errors);

    return isError;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error message when user starts typing again
    if (formErrors[`${e.target.name}Error`]) {
      setFormErrors({ ...formErrors, [`${e.target.name}Error`]: "" });
    }
  };

  const handleSubmit = async (e) => {
    console.log("object");
    e.preventDefault();

    const err = validateForm();

    if (!err) {
      console.log(formData);
      try {
        const response = await axios.post(`${url}/login`, {
          email: formData.email,
          password: formData.password,
        });
        localStorage.removeItem("userData");
        if (response.data !== "Login failed") {
          localStorage.setItem("userData", JSON.stringify(response.data));
          setTimeout(() => {
            navigate("/graduate/tasks");
          }, 4000);
          toast.success("Login successful!");
        } else {
          toast.error("Something Went Wrong");
        }
        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        toast.error("Invalid Credentials");
      }
    } else {
      toast.warning("Form submission failed. Please fill all required fields.");
    }
  };
  return (
    <>
      <div className="registerMainCont">
        <h2 className="loginText">Login For Volunteer Program</h2>

        <form className="registerSubCont" onSubmit={handleSubmit}>
          <div className="inputCont">
            <label className="labelText">
              University Email Address <span className="spanStyle">*</span>
            </label>
            <input
              type="text"
              className="inputStyles"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.emailError && (
              <span className="error">{formErrors.emailError}</span>
            )}
          </div>
          <div className="inputCont">
            <label className="labelText">
              Password <span className="spanStyle">*</span>
            </label>
            <input
              type="password"
              className="inputStyles"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.passwordError && (
              <span className="error">{formErrors.passwordError}</span>
            )}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <h3>
            Don’t have an account? <Link to="/register">Register Here</Link>
          </h3>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Login;
