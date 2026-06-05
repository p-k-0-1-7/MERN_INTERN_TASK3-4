import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTask = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const updateTask = async () => {
    try {
      await API.put(`/tasks/${editingId}`, { title, description });
      setEditingId(null);
      setTitle("");
      setDescription("");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="nav-group">
        <button className="logout-btn" onClick={logout}>Logout</button>
        <Link to="/blogs"><button className="blog-btn">Blog Posts</button></Link>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editingId ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>
              <h3
                onClick={() => toggleTask(task)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {task.title}
              </h3>
              <p>{task.description}</p>
              <small>Status: {task.completed ? "Completed" : "Pending"}</small>
            </div>
            <div className="btn-group">
              <button onClick={() => editTask(task)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
