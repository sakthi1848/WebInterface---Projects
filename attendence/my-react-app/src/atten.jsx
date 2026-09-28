import React, { useState } from "react";
import "./atten.css";

function Atten() {

  // 21 Students
  const [students, setStudents] = useState([
    { id: 1, name: "Akshaya", present: 20, total: 25 },
    { id: 2, name: "Bala", present: 22, total: 25 },
    { id: 3, name: "Badma", present: 18, total: 25 },
    { id: 4, name: "Danvanth", present: 21, total: 25 },
    { id: 5, name: "Deepak", present: 19, total: 25 },
    { id: 6, name: "Hari", present: 23, total: 25 },
    { id: 7, name: "Jaisurya", present: 20, total: 25 },
    { id: 8, name: "Jesiomflana", present: 17, total: 25 },
    { id: 9, name: "Keevin", present: 22, total: 25 },
    { id: 10, name: "Kiruthika", present: 24, total: 25 },
    { id: 11, name: "Kishore", present: 18, total: 25 },
    { id: 12, name: "Naraindiran", present: 19, total: 25 },
    { id: 13, name: "Nikil", present: 23, total: 25 },
    { id: 14, name: "Priya", present: 20, total: 25 },
    { id: 15, name: "Roobi", present: 16, total: 25 },
    { id: 16, name: "Sakthi", present: 22, total: 25 },
    { id: 17, name: "Shanjevv", present: 18, total: 25 },
    { id: 18, name: "Shilaja", present: 21, total: 25 },
    { id: 19, name: "Surya", present: 24, total: 25 },
    { id: 20, name: "Vishva", present: 19, total: 25 }
  ]);

  // Mark Present
  const markPresent = (id) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            present: student.present + 1,
            total: student.total + 1
          };
        }

        return student;
      })
    );
  };

  // Mark Absent
  const markAbsent = (id) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            total: student.total + 1
          };
        }

        return student;
      })
    );
  };

  return (
    <div className="container">

      <h1>Student Attendance Tracker</h1>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Present</th>
            <th>Total Classes</th>
            <th>Attendance %</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => {

            const percentage =
              (student.present / student.total) * 100;

            return (
              <tr key={student.id}>

                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.present}</td>

                <td>{student.total}</td>

                <td>
                  {percentage.toFixed(2)}%
                </td>

                <td>

                  <button
                    className="present-btn"
                    onClick={() => markPresent(student.id)}
                  >
                    Present
                  </button>

                  <button
                    className="absent-btn"
                    onClick={() => markAbsent(student.id)}
                  >
                    Absent
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default Atten;