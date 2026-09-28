import React, { useState, useEffect } from "react";
import "./ReportCard.css";

// Initial student data
const initialStudents = [
  { id: 1, name: "Akshaya", maths: 90, science: 85, english: 92 },
  { id: 2, name: "Kevin", maths: 78, science: 82, english: 80 },
  { id: 3, name: "Kishore", maths: 65, science: 70, english: 75 },
  { id: 4, name: "Sakthi", maths: 95, science: 91, english: 88 },
  { id: 5, name: "Arjun", maths: 82, science: 79, english: 85 },
  { id: 6, name: "Surya", maths: 72, science: 76, english: 80 },
  { id: 7, name: "Sanjeev", maths: 88, science: 84, english: 90 },
  { id: 8, name: "Deva", maths: 60, science: 68, english: 72 },
  { id: 9, name: "Steev", maths: 85, science: 89, english: 86 },
  { id: 10, name: "Zyan", maths: 92, science: 90, english: 94 },
  { id: 11, name: "Dheepak", maths: 75, science: 78, english: 82 },
  { id: 12, name: "Thara", maths: 89, science: 93, english: 91 },
  { id: 13, name: "Nikil", maths: 70, science: 73, english: 76 },
  { id: 14, name: "Flana", maths: 83, science: 87, english: 80 },
  { id: 15, name: "Nandini", maths: 96, science: 94, english: 98 }
];

// Calculate total marks
const getTotal = (student) =>
  student.maths + student.science + student.english;

// Calculate percentage
const getPercentage = (student) =>
  (getTotal(student) / 300) * 100;

// Calculate grade
const getGrade = (percentage) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
};

// Reusable summary card
function SummaryCard({ title, value, color }) {
  return (
    <div className={`summary-card ${color}`}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

// Reusable student row
function StudentRow({ student, index, onDelete }) {
  const total = getTotal(student);
  const percentage = getPercentage(student);
  const grade = getGrade(percentage);

  return (
    <tr>
      <td>{index + 1}</td>
      <td className="student-name">{student.name}</td>
      <td>{student.maths}</td>
      <td>{student.science}</td>
      <td>{student.english}</td>
      <td className="total">{total}</td>
      <td>{percentage.toFixed(1)}%</td>
      <td>
        <span className={`grade grade-${grade.replace("+", "plus")}`}>
          {grade}
        </span>
      </td>
      <td>
        <button
          className="delete-btn"
          onClick={() => onDelete(student.id)}
          aria-label={`Delete ${student.name}`}
          type="button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

// Main component
function ReportCard() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("reportStudents");
      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    maths: "",
    science: "",
    english: ""
  });

  const [error, setError] = useState("");

  // Save student records and update page title
  useEffect(() => {
    localStorage.setItem("reportStudents", JSON.stringify(students));
    document.title = "Student Report Card";
  }, [students]);

  // Handle all form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
  };

  // Filter students using filter()
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const grade = getGrade(getPercentage(student));

    const matchesGrade =
      gradeFilter === "All" || grade === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  // Calculate class average using reduce()
  const classAverage =
    students.length > 0
      ? students.reduce(
          (sum, student) => sum + getPercentage(student),
          0
        ) / students.length
      : 0;

  const passedStudents = students.filter(
    (student) => getPercentage(student) >= 50
  ).length;

  // Add a new student
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      setError("Please enter the student's name.");
      return;
    }

    const marks = [
      Number(form.maths),
      Number(form.science),
      Number(form.english)
    ];

    if (
      marks.some(
        (mark) => !Number.isFinite(mark) || mark < 0 || mark > 100
      ) ||
      ["maths", "science", "english"].some(
        (subject) => form[subject] === ""
      )
    ) {
      setError("Enter marks between 0 and 100 for every subject.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      maths: marks[0],
      science: marks[1],
      english: marks[2]
    };

    setStudents((previous) => [...previous, newStudent]);

    setForm({
      name: "",
      maths: "",
      science: "",
      english: ""
    });

    setError("");
    setShowForm(false);
  };

  // Delete a student
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmed) {
      setStudents((previous) =>
        previous.filter((student) => student.id !== id)
      );
    }
  };

  // Restore original records
  const handleReset = () => {
    if (window.confirm("Restore the original student records?")) {
      setStudents(initialStudents);
      setSearch("");
      setGradeFilter("All");
    }
  };

  return (
    <div className="report-container">
      <header className="app-header">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT</p>
          <h1>Report Card</h1>
          <p className="header-subtitle">
            Academic Performance Dashboard
          </p>
        </div>

        <div className="header-icon">📚</div>
      </header>

      <main className="report-content">
        {/* Summary cards */}
        <section className="summary-container">
          <SummaryCard
            title="Total Students"
            value={students.length}
            color="blue"
          />

          <SummaryCard
            title="Class Average"
            value={`${classAverage.toFixed(1)}%`}
            color="purple"
          />

          <SummaryCard
            title="Passed Students"
            value={passedStudents}
            color="green"
          />

          <SummaryCard
            title="Failed Students"
            value={students.length - passedStudents}
            color="orange"
          />
        </section>

        {/* Search and filters */}
        <section className="table-section">
          <div className="section-heading">
            <div>
              <h2>Student Records</h2>
              <p>View and manage academic performance</p>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                setShowForm((previous) => !previous);
                setError("");
              }}
              type="button"
            >
              {showForm ? "Close Form" : "+ Add Student"}
            </button>
          </div>

          {/* Add student form */}
          {showForm && (
            <form className="student-form" onSubmit={handleSubmit}>
              <h3>Add New Student</h3>

              <div className="form-grid">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Student name"
                  maxLength={50}
                  required
                />

                <input
                  name="maths"
                  type="number"
                  min="0"
                  max="100"
                  value={form.maths}
                  onChange={handleChange}
                  placeholder="Maths marks"
                  required
                />

                <input
                  name="science"
                  type="number"
                  min="0"
                  max="100"
                  value={form.science}
                  onChange={handleChange}
                  placeholder="Science marks"
                  required
                />

                <input
                  name="english"
                  type="number"
                  min="0"
                  max="100"
                  value={form.english}
                  onChange={handleChange}
                  placeholder="English marks"
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button className="primary-btn" type="submit">
                Save Student
              </button>
            </form>
          )}

          <div className="toolbar">
            <input
              className="search-input"
              type="search"
              placeholder="🔍 Search student name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={gradeFilter}
              onChange={(event) => setGradeFilter(event.target.value)}
              aria-label="Filter by grade"
            >
              <option value="All">All Grades</option>
              <option value="A+">Grade A+</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
              <option value="D">Grade D</option>
              <option value="F">Grade F</option>
            </select>

            <button className="reset-btn" onClick={handleReset}>
              Reset Data
            </button>
          </div>

          <p className="record-count">
            Showing {filteredStudents.length} of {students.length} students
          </p>

          {/* Student table */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Maths</th>
                  <th>Science</th>
                  <th>English</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    index={index}
                    onDelete={handleDelete}
                  />
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="9" className="empty-message">
                      No students found. Try another search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="grading-note">
            Passing mark: 50% | Maximum marks: 300
          </p>
        </section>
      </main>

      <footer className="footer">
        Student Report Card Management System | React Project
      </footer>
    </div>
  );
}

export default ReportCard;