import React from "react";
import Header from "../header";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="hero-section">
          <h1>Welcome to Careerhaven</h1>
          <p>
            Streamlining communication and task management for academic
            institutions.
          </p>
        </div>
        <div className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>User Registration and Authentication</li>
            <li>Graduate Dashboard</li>
            <li>Professor Dashboard</li>
            <li>Task Management</li>
            <li>Weekly Reports</li>
            <li>Anti-Cheating Mechanism</li>
            <li>Chat Application</li>
          </ul>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Careerhaven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
