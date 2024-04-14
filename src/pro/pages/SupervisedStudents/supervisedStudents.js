import React from "react";
import { studentDetails } from "../../data";

const SupervisedStudents = () => {
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
            <th style={{ border: "1px solid black" }}>Progress of Each Task</th>
            <th style={{ border: "1px solid black" }}>Student Details</th>
          </tr>
        </thead>

        {studentDetails.map((student) => (
          <tbody key={student.id}>
            <tr>
              <td style={{ border: "1px solid black", padding: "12px" }}>
                {student.name}
              </td>
              <td style={{ border: "1px solid black" }}>{student.email}</td>
              <td style={{ border: "1px solid black" }}>{student.progress}</td>
              <td style={{ border: "1px solid black" }}>{student.details}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default SupervisedStudents;
