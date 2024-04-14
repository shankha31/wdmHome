import React from "react";
import Header from "../header";
import "./service.css";

const Service = () => {
  return (
    <div>
      <Header />
      <div className="service-page">
        <div className="service-section">
          <h2>Our Services</h2>
          <div className="service-item">
            <h3>User Registration and Authentication</h3>
            <p>
              Streamlined registration and secure authentication process for
              graduates using their university email addresses.
            </p>
          </div>
          <div className="service-item">
            <h3>Graduate Dashboard</h3>
            <p>
              Personalized dashboard for graduates to view assigned tasks,
              submit weekly reports, and access relevant information.
            </p>
          </div>
          <div className="service-item">
            <h3>Professor Dashboard</h3>
            <p>
              Comprehensive dashboard for professors to create tasks, view
              reports, provide feedback, and generate recommendation letters.
            </p>
          </div>
          <div className="service-item">
            <h3>Task Management</h3>
            <p>
              Efficient task management system allowing graduates to update task
              statuses and professors to monitor progress.
            </p>
          </div>
          <div className="service-item">
            <h3>Weekly Reports</h3>
            <p>
              Submission of weekly reports by graduates summarizing their
              activities and accomplishments, with built-in validation and
              plagiarism checks.
            </p>
          </div>
          <div className="service-item">
            <h3>Anti-Cheating Mechanism</h3>
            <p>
              Implementation of AI-driven measures to prevent cheating and
              ensure the authenticity of submitted reports.
            </p>
          </div>
          <div className="service-item">
            <h3>Chat Application</h3>
            <p>
              Real-time communication tool for graduates and professors to
              discuss tasks and clarify any issues or questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
