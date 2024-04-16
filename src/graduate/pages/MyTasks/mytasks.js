import React, { useEffect, useState } from "react";
import { taskDetails } from "../../data";
import axios from "axios";
import url from "../../../globalUrl";

const MyTasks = () => {
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
  console.log('tt',taskDetails);
  return (
    <div>
      <h2>My Tasks</h2>
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "18px" }}>
              Task ID
            </th>
            <th style={{ border: "1px solid black", padding: "18px" }}>
              Task Name
            </th>
            <th style={{ border: "1px solid black" }}>Task Deadline</th>
            <th style={{ border: "1px solid black" }}>Task Priority</th>
            <th style={{ border: "1px solid black" }}>Task Description</th>
          </tr>
        </thead>

        {taskDetails.map((task) => (
          <tbody key={task.id}>
            <tr>
              <td style={{ border: "1px solid black", padding: "12px" }}>
                Task
              </td>
              <td style={{ border: "1px solid black", padding: "12px" }}>
                {task.name}
              </td>
              <td style={{ border: "1px solid black" }}>{task.task?.deadline}</td>
              <td style={{ border: "1px solid black" }}>{task.task?.priority}</td>
              <td style={{ border: "1px solid black" }}>{task.task?.description}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default MyTasks;
