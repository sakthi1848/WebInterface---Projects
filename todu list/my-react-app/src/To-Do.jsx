import React, { createContext, useContext, useState } from "react";
import "./To-Do.css";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((item) => item.id !== id)
    );
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        task,
        setTask,
        addTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const TodoApp = () => {
  const {
    tasks,
    task,
    setTask,
    addTask,
    deleteTask,
    toggleTask,
  } = useContext(TodoContext);

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div className="app">
      <div className="todo-card">

        <div className="header">
          <div>
            <p className="subtitle">PRODUCTIVITY</p>
            <h1>My Tasks</h1>
          </div>

          <div className="task-count">
            <span>{tasks.length}</span>
            <small>Tasks</small>
          </div>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit">
            + Add Task
          </button>
        </form>

        <div className="progress-section">
          <div className="progress-info">
            <span>Progress</span>
            <span>
              {completedTasks}/{tasks.length} completed
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width:
                  tasks.length > 0
                    ? `${(completedTasks / tasks.length) * 100}%`
                    : "0%",
              }}
            ></div>
          </div>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h3>No tasks yet</h3>
              <p>
                Add your first task and start being productive.
              </p>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                className={`task-item ${
                  item.completed ? "completed-task" : ""
                }`}
                key={item.id}
              >
                <div
                  className={`checkbox ${
                    item.completed ? "checked" : ""
                  }`}
                  onClick={() => toggleTask(item.id)}
                >
                  {item.completed && "✓"}
                </div>

                <span className="task-title">
                  {item.title}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                  title="Delete task"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="footer">
            <span>
              {tasks.length - completedTasks} tasks remaining
            </span>

            <span>
              {completedTasks === tasks.length
                ? "🎉 All tasks completed!"
                : "Keep going!"}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;