import React, { useEffect, useState } from "react";
import "./reportsReview.css";
import axios from "axios";
import url from "../../../globalUrl";
import { Button, Form, InputNumber, Modal } from "antd";
import { reports } from "../../data";
const ReportsReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weekNumber, setWeekNumber] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      const response = await axios.post(`${url}/weeks`, {
        week: String(weekNumber),
      });
      setWeekNumber(null);
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const [reports, setReports] = useState([]);
  // const fetchReports = async () => {
  //   try {
  //     const response = await axios.get(`${url}/reports/graduate`);
  //     console.log(response);
  //     setReports(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchReports();
  // }, []);
  return (
    <div className="reportsReviewContainer">
      {reports.map((report) => (
        <div className="reportsCont" key={report.id}>
          <div className="reportCard">
            <p>Name : {report.name ? report.name : "Test"}</p>
            <p>
              Student Name :
              {report.submittedBy ? report.submittedBy : "TestName"}
            </p>
            <p>{report.details}</p>
          </div>
          <textarea
            type="text"
            placeholder="Feedback"
            className="inputStyless"
          />
        </div>
      ))}
      <Button
        style={{ background: "#bbf246", marginTop: "2rem", height: "3rem" }}
        onClick={showModal}
      >
        Create Week
      </Button>
      <Modal
        title="Select Week Number"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputNumber
          addonBefore={" "}
          value={weekNumber}
          onChange={(e) => setWeekNumber(e)}
          placeholder="select a week number"
        />
      </Modal>
    </div>
  );
};

export default ReportsReview;
