import React from "react";
import "./ProfileCard.css";

function ProfileCard() {
  const student = {
    name: "Sakthivel S",
    registerNo: "038",
    department: "Cyber Security",
    year: "2nd Year B.E",
    semester: 3,
    cgpa: 8.5,
    attendance: 82,
    subjects: ["React", "Java", "Python", "SQL", "DBMS"],
  };

  return (
    <div className="page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">S</div>

          <h1>{student.name}</h1>
          <p>{student.department}</p>

          <span className="year-badge">{student.year}</span>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span>Register Number</span>
            <strong>{student.registerNo}</strong>
          </div>

          <div className="detail-item">
            <span>Semester</span>
            <strong>{student.semester}</strong>
          </div>

          <div className="detail-item">
            <span>CGPA</span>
            <strong>{student.cgpa}</strong>
          </div>

          <div className="detail-item">
            <span>Attendance</span>
            <strong>{student.attendance}%</strong>
          </div>
        </div>

        <div className="subjects-section">
          <h2>My Subjects</h2>

          <div className="subjects-list">
            {student.subjects.map((subject) => (
              <span className="subject" key={subject}>
                {subject}
              </span>
            ))}
          </div>
        </div>

        <button
          className="profile-button"
          onClick={() => alert(`Welcome, ${student.name}!`)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;