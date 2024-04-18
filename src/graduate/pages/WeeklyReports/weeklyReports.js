import React, { useRef, useState, useEffect } from "react";
import "./weeklyReports.css";
import axios from "axios";
import url from "../../../globalUrl";

const WeeklyReports = () => {
  const fileInputRef = useRef(null);
  const [comment, setComment] = useState("");
  const [weeks, setWeeks] = useState([]);
  const [reports, setReports] = useState([]);

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
      formData.append("week", weekId);
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
  const getWeeks = async () => {
    try {
      const response = await axios.get(`${url}/weeks`);
      setWeeks(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getReports = async () => {
    try {
      const response = await axios.get(
        `${url}/reports/graduate/${
          JSON.parse(localStorage.getItem("userData")).id
        }`
      );
      console.log(response);
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeeks();
    getReports();
  }, []);
  return (
    <div className="weeklyReportsCont">
      {weeks.map((week) => {
        const report = reports.find((r) => r.week === week.id);
        return (
          <div className="weekCardcont">
            <h1>Week - {week.week}</h1>
            {report ? (
              <>
                <div>
                  <p>Copied: {report?.copied}</p>
                  <h2>AI Report</h2>
                  <p>fakeness: {JSON.parse(report?.ai_score).fakePercentage}</p>
                  <p>human: {JSON.parse(report?.ai_score).isHuman}</p>
                </div>
                <button
                  disabled
                  type="submit"
                  style={{ cursor: "not-allowed" }}
                  className="btnClass"
                >
                  Submitted
                </button>
              </>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    style={{ width: "10rem" }}
                    className="uploadfileBtn"
                    onClick={handleFileClick}
                  >
                    upload file
                  </button>
                  <p style={{ fontSize: "12px" }}>
                    only pdf and docx files are allowed
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  ref={fileInputRef}
                  className="fileinput"
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Enter comments"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <button
                  onClick={() => handleSubmit(week.id)}
                  className="btnClass"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        );
      })}

      <p>
        Note: Please ensure that you write the report yourself without the use
        of any AI agents or assistance.
      </p>
    </div>
  );
};

export default WeeklyReports;
