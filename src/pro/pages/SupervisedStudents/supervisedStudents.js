import React,{useState, useEffect} from "react";
// import { studentDetails } from "../../data";
import axios from "axios";
import url from "../../../globalUrl";

const SupervisedStudents = () => {

  const [studentDetails, setStudentDetails] = useState([]);
  const fetchSupervisedStudents = async () => {
    try {
      const response = await axios.get(`${url}/graduates`);
      console.log(response);
      setStudentDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSupervisedStudents();
  }, []);

  return (
    <div>
      <h2>Supervised Students</h2>
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
              Student Name
            </th>
            <th style={{ border: "1px solid black" }}>Student Email</th>
            <th style={{ border: "1px solid black" }}>Task Assigned</th>
            <th style={{ border: "1px solid black" }}>submissions</th>
          </tr>
        </thead>

        {studentDetails.map((student) => (
          <tbody key={student.id}>
            <tr>
              <td style={{ border: "1px solid black", padding: "12px" }}>
                {student.name}
              </td>
              <td style={{ border: "1px solid black" }}>{student.email}</td>
              <td style={{ border: "1px solid black" }}>{student.assignedTasks}</td>
              <td style={{ border: "1px solid black" }}>{student.submittedTasks}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default SupervisedStudents;
