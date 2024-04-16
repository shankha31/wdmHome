import React, { useEffect, useRef, useState } from "react";
import "./taskAssignment.css";
import { useNavigate } from "react-router-dom";
import {
  currentTasksData,
  previousTasksData,
  upcomingTasksData,
} from "../../data";
import axios from "axios";
import url from "../../../globalUrl";
import { toast } from "react-toastify";
import { Select } from "antd";

const TaskAssignment = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [priority, setPriority] = useState("");
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [graduates, setGraduates] = useState([]);
  const [currTask, setCurrentTask] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/tasks`);
      console.log(response);
      setTaskData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGraduates = async () => {
    try {
      const response = await axios.get(`${url}/graduates`);
      console.log(response);
      setGraduates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const upcomingTasks = (task) => {
    fetchGraduates();
    setCurrentTask(task);
    setIsModelOpen(true);
    setIsUpcoming(true);
  };
  const closeModel = () => {
    setIsModelOpen(false);
  };
  const handleAsign = async (taskId) => {
    try {
      const response = await axios.post(`${url}/tasks/assign`, {
        task: taskId,
        graduates: selectedItems,
      });
      setSelectedItems([]);
      toast.success("Task Assigned Successfully");
      setIsModelOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const extention = fileInputRef.current.files[0]?.name.split(".").pop();
      // if (extention !== "pdf") {
      //   return toast.error("File must be in pdf format");
      // }
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("description", taskDescription);
      formData.append("startDate", startDate);
      formData.append("deadline", deadline);
      formData.append("priority", priority);
      formData.append("feedback", feedback);
      formData.append("name", name);

      const response = await axios.post(`${url}/tasks`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Task created successfully!");
      fetchData();
      setTaskDescription("");
      setDeadline("");
      setPriority("");
      setFeedback("");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task");
    }
  };

  return (
    <div>
      <div className="taskAssignContainer">
        <div>
          <h1 className="tasksHeading">Tasks</h1>
          <div className="subTasksContainer">
            {taskData.map((task) => (
              <div
                className="subTasks"
                onClick={() => upcomingTasks(task)}
                key={task.id}
              >
                <h2>{task.feedback}</h2>
                <p>{task.description}</p>
                <p>{task.startDate}</p>
                <p>{task.deadline}</p>
                
                <p>{task.priority}</p>
                <p>{task.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div>
          <h1 className="tasksHeading">Previous tasks</h1>
          <div className="subTasksContainer">
            {previousTasksData.map((task) => (
              <div className="subTasks" onClick={onClickTask} key={task.id}>
                <h2>{task.name}</h2>
                <p>{task.desc}</p>
                <p>{task.deadLine}</p>
                <p>{task.feedBack}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div>
          <h1 className="tasksHeading">Current Tasks</h1>
          <div className="subTasksContainer">
            {currentTasksData.map((task) => (
              <div className="subTasks" key={task.id}>
                <h2>{task.name}</h2>
                <p>{task.desc}</p>
                <p>{task.deadLine}</p>
                <p>{task.feedBack}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <form onSubmit={handleSubmit}>
        <h1 className="tasksHeading">Create Task</h1>
        <div className="uploadContainer">
          <button className="uploadfileBtn" onClick={handleFileClick}>
            upload file
          </button>
          <input type="file" ref={fileInputRef} className="fileinput" />
          <textarea
            type="text"
            rows={5}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter Task Description"
            className="inputStylesTextArea"
          />
        </div>

        <div className="inputContainers">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task Name"
            className="inputStyles"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Task Deadline"
            className="inputStyles"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Task Deadline"
            className="inputStyles"
          />
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Task Priority"
            className="inputStyles"
          />

          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Feedback"
            className="inputStyles"
          />
        </div>
        <div className="btnContainer">
          <button type="submit" className="btnClass">
            Create Task
          </button>
        </div>
      </form>

      {isModelOpen && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModel}>
              &times;
            </span>
            <h1>Task Name: {currTask.feedback}</h1>
            <p>Task Descriprion: {currTask.description}</p>
            <p>Task DeadLine: {currTask.deadline} </p>
            <p>Task Priority: {currTask.priority} </p>
            {isUpcoming && (
              <div>
                <h4>Select Graduates </h4>
                <Select
                  mode="multiple"
                  placeholder="Select graduates"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  style={{ width: "30%", marginBottom: "10px" }}
                  options={graduates.map((item) => ({
                    value: item.id,
                    label: item.name ? item.name : "Not Available",
                  }))}
                />
                {/* <select multiple>
                  {graduates.map((itm) => {
                    return (
                      <>
                        <option value={itm.id}>{itm.name}</option>
                      </>
                    );
                  })}
                </select> */}

                <div>
                  <button
                    onClick={() => {
                      handleAsign(currTask.id);
                    }}
                    className="btnClass"
                  >
                    Assign
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAssignment;
