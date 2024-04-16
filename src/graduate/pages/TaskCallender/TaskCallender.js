import { Calendar, Badge } from "antd";
import axios from "axios";
import url from "../../../globalUrl";
import React, { useEffect, useState } from "react";

const TaskCallender = () => {
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

  console.log(taskDetails);

  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 12:
        listData = [
          {
            type: "warning",
            content: "This is warning event.",
          },
          {
            type: "success",
            content: "This is usual event.",
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: "warning",
            content: "This is warning event.",
          },
          {
            type: "success",
            content: "This is usual event.",
          },
          {
            type: "error",
            content: "This is error event.",
          },
        ];
        break;
      case 15:
        listData = [
          {
            type: "warning",
            content: "This is warning event",
          },
          {
            type: "success",
            content: "This is very long usual event......",
          },
          {
            type: "error",
            content: "This is error event 1.",
          },
          {
            type: "error",
            content: "This is error event 2.",
          },
          {
            type: "error",
            content: "This is error event 3.",
          },
          {
            type: "error",
            content: "This is error event 4.",
          },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Calendar
        cellRender={(date) => {
          return taskDetails.map((itm) => {
            if (itm?.task?.deadline === date.format("YYYY-MM-DD")) {
              return (
                <Badge status="error" text={("End Date - ", itm?.task?.name)} />
              );
            } else if (itm?.task?.startDate === date.format("YYYY-MM-DD")) {
              return (
                <Badge
                  status="success"
                  text={("Start Date - ", itm?.task?.name)}
                />
              );
            }
          });
        }}
      />
    </>
  );
};

export default TaskCallender;
