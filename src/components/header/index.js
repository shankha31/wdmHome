import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <h1></h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/service" activeClassName="active">
              Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/professor/register" activeClassName="active">
              Professor
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" activeClassName="active">
              Graduate
            </NavLink>
          </li>
          <li>
            <a href="https://kxm6498.uta.cloud/"> BLOG </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
