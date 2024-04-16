import React, { useEffect, useRef, useState } from "react";
import "./upcomingDeadLines.css";
import axios from "axios";
import url from "../../../globalUrl";
import { toast } from "react-toastify";

const UpcomingDeadLines = () => {
  const fileInputRef = useRef(null);
  const [comment, setComment] = useState("");
  const [taskDetails, setTaskDetails] = useState([]);
  const fetchTasksOfGraduate = async () => {
    try {
      const response = await axios.post(`${url}/tasks/assigned`, {
        graduate: JSON.parse(localStorage.getItem("userData")).id,
      });
      console.log(response);
      setTaskDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasksOfGraduate();
  }, []);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = async (taskId) => {
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      formData.append(
        "graduate",
        JSON.parse(localStorage.getItem("userData")).id
      );
      formData.append("task", taskId);
      formData.append("comment", comment);

      const response = await axios.post(`${url}/submissions`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setComment("");
      alert("Task Submitted Successfully");
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Error submitting task:", error);
    }
  };

  return (
    <div className="upcomingContainer">
      {taskDetails.map((itm) => {
        return (
          <>
            <div className="upcomingSubContainer">
              <div className="upcomingCard">
                <h3>Task ID : {itm.id}</h3>
                <h3>Task Name : {itm.task?.name}</h3>
                <h3>Task Deadline : {itm.task?.deadline}</h3>
              </div>
              <div className="uploadContainer">
                <button className="uploadfileBtn" onClick={handleFileClick}>
                  upload file
                </button>
                <input type="file" ref={fileInputRef} className="fileinput" />
                <textarea
                  type="text"
                  rows={5}
                  placeholder="Enter Comment (Optional)"
                  className="inputStylesTextArea"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="btnContainer">
                <button
                  onClick={() => handleSubmit(itm.task?.id)}
                  className="btnClass"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default UpcomingDeadLines;
