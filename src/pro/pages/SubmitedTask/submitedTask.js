import React, { useEffect, useRef, useState } from "react";
import "./submitedTask.css";
import { useNavigate } from "react-router-dom";
import {
  currentTasksData,
  previousTasksData,
  upcomingTasksData,
} from "../../data";
import axios from "axios";
import url from "../../../globalUrl";
import { toast } from "react-toastify";
import { Form, Input, Select } from "antd";

const SubmitedTask = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [feedback, setFeedback] = useState("");
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

  const handleFileClick = () => {
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
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("taskDescription", taskDescription);
      formData.append("deadline", deadline);
      formData.append("priority", priority);
      formData.append("feedback", feedback);

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
          <h1 className="tasksHeading">Submited Tasks</h1>
          <div className="subTasksContainer">
            {taskData.map((task) => (
              <div
                className="subTasks"
                onClick={() => upcomingTasks(task)}
                key={task.id}
              >
                <h2>{task.feedback}</h2>
                <p>{task.description}</p>
                <p>{task.deadline}</p>
                <p>{task.priority}</p>
                <p>{task.feedback}</p>
                <p>Cheating - Yes/No</p>
                <Form.Item name="grade" label="Grade">
                  <Input></Input>
                </Form.Item>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitedTask;
