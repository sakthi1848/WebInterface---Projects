import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Portfolio.css";

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Hi, I'm Sakthivel</h1>

        <h2>Cyber Security Student</h2>

        <p>
          Welcome to my personal portfolio. I am interested in
          Web Development, Cyber Security and UI/UX Design.
        </p>

        <Link to="/projects" className="btn">
          View My Projects
        </Link>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>About Me</h1>

      <div className="about-card">
        <h2>Sakthivel S</h2>

        <p>
          I am a Computer Science and Engineering student
          specializing in Cyber Security.
        </p>

        <p>
          I enjoy developing websites and applications using
          modern technologies. I am also interested in Cyber
          Security and UI/UX design.
        </p>

        <div className="details">
          <p>
            <strong>Name:</strong> Sakthivel S
          </p>

          <p>
            <strong>Department:</strong> CSE - Cyber Security
          </p>

          <p>
            <strong>Year:</strong> 2nd Year
          </p>

          <p>
            <strong>Interests:</strong> Web Development,
            Cyber Security, UI/UX
          </p>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Java",
    "SQL",
    "UI/UX Design",
    "Cyber Security",
    "GitHub"
  ];

  return (
    <div className="page">
      <h1>My Skills</h1>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <h3>{skill}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    {
      title: "Student Report Generator",
      description:
        "A project used to generate student academic reports."
    },
    {
      title: "Bank Account Management",
      description:
        "A Java OOP project used to manage bank accounts and transactions."
    },
    {
      title: "Library Management System",
      description:
        "A system used to manage books, students and library records."
    },
    {
      title: "India Travel Explorer",
      description:
        "A tourism website designed to explore different destinations in India."
    },
    {
      title: "Student Attendance Tracker",
      description:
        "A React application used to track and manage student attendance."
    },
    {
      title: "Simple Quiz Game",
      description:
        "A Python project that provides questions and calculates the user's score."
    }
  ];

  return (
    <div className="page">
      <h1>My Projects</h1>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <button>
              View Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Message sent successfully!");
  };

  return (
    <div className="page">
      <h1>Contact Me</h1>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter your name"
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          required
        />

        <input
          type="text"
          placeholder="Enter your subject"
          required
        />

        <textarea
          placeholder="Enter your message"
          required
        ></textarea>

        <button type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

function Portfolio() {
  return (
    <BrowserRouter>
      <nav className="navbar">

        <div className="logo">
          <h2>Sakthivel</h2>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/skills">
            Skills
          </Link>

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/skills"
          element={<Skills />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default Portfolio;