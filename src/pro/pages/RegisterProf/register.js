import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import url from "../../../globalUrl";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    fullNameError: "",
    passwordError: "",
  });

  const validateForm = () => {
    let isError = false;
    const errors = {
      emailError: "",
      fullNameError: "",
      passwordError: "",
    };

    if (!formData.email) {
      isError = true;
      errors.emailError = "Email is required";
    }

    if (!formData.fullName) {
      isError = true;
      errors.fullNameError = "Full name is required";
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

    if (formErrors[`${e.target.name}Error`]) {
      setFormErrors({ ...formErrors, [`${e.target.name}Error`]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (!err) {
      try {
        const response = await axios.post(`${url}/professor/register`, {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        setFormData({
          email: "",
          fullName: "",
          password: "",
        });
        if (response.data !== "User already exists") {
          setTimeout(() => {
            navigate("/professor/login");
          }, 4000);
          toast.success("Registration successful!");
        } else {
          toast.error("User already exists");
        }
      } catch (error) {
        toast.error("Invalid Credentials");
      }
    } else {
      toast.error("Form submission failed. Please fill all required fields.");
    }
  };

  return (
    <div className="registerMainCont">
      <h2 className="registerText">Registration Form</h2>
      <form className="registerSubCont" onSubmit={handleSubmit}>
        <div className="inputCont">
          <label className="labelText">
            Email Address <span className="spanStyle">*</span>
          </label>
          <input
            type="text"
            style={{ width: "100%" }}
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
            Full name <span className="spanStyle">*</span>
          </label>
          <input
            type="text"
            style={{ width: "100%" }}
            className="inputStyles"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {formErrors.fullNameError && (
            <span className="error">{formErrors.fullNameError}</span>
          )}
        </div>
        <div className="inputCont">
          <label className="labelText">
            Password <span className="spanStyle">*</span>
          </label>
          <input
            type="password"
            style={{ width: "100%" }}
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
          Submit
        </button>

        <h3>
          Already have an account? <Link to="/professor/login">Login Here</Link>
        </h3>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
