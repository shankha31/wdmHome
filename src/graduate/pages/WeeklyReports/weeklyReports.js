import React, { useRef, useState } from "react";
import "./weeklyReports.css";
import axios from "axios";
import url from "../../../globalUrl";

const WeeklyReports = () => {
  const fileInputRef = useRef(null);
  const [comment, setComment] = useState("");

  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = async (weekId) => {
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      formData.append(
        "graduate",
        JSON.parse(localStorage.getItem("userData")).id
      );
      formData.append("task", weekId);
      formData.append("comment", comment);

      const response = await axios.post(`${url}/reports`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setComment("");
      alert("Report created successfully");
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Error submitting report:", error);
    }
  };
  return (
    <div className="weeklyReportsCont">
      <div className="weekCardcont">
        <h1>Week - 1</h1>

        <button
          disabled
          type="submit"
          style={{ cursor: "not-allowed" }}
          className="btnClass"
        >
          Submited
        </button>
      </div>
      <div className="weekCardcont">
        <h1>Week - 2</h1>

        <button
          disabled
          type="submit"
          style={{ cursor: "not-allowed" }}
          className="btnClass"
        >
          Submitted
        </button>

        <input type="file" ref={fileInputRef} className="fileinput" />
      </div>
      <div className="weekCardcont">
        <h1>Week - 3</h1>

        <button
          disabled
          type="submit"
          style={{ cursor: "not-allowed" }}
          className="btnClass"
        >
          Submitted
        </button>
      </div>
      <div className="weekCardcont">
        <h1>Week - 4</h1>

        <button className="uploadfileBtn" onClick={handleFileClick}>
          upload file
        </button>
        <input type="file" ref={fileInputRef} className="fileinput" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Enter comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button onClick={() => handleSubmit(1)} className="btnClass">
          Submit
        </button>
      </div>
      <p>
        Note: Please ensure that you write the report yourself without the use
        of any AI agents or assistance.
      </p>
    </div>
  );
};

export default WeeklyReports;
