import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [filter, setFilter] = useState("all"); // all, completed, pending


  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/todos`, config);
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError(err.response?.data?.error || "Error al cargar tareas");
      }
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/todos`,
        { title: description },
        config
      );
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("No se pudo agregar la tarea");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`, config);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la tarea");
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/todos/${id}`,
        { title: editingText },
        config
      );
      setEditingId(null);
      setEditingText("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar la tarea");
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/todos/${task.id}`,
        { completed: !task.completed },
        config
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el estado");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completada") return task.completed;
    if (filter === "pendiente") return !task.completed;
    return true;
  });


  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  return (
    <div className="position-relative min-vh-100 bg-body text-body px-3 py-4">
      <div className="">
        <ThemeToggle />
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>

      <div className="mx-auto w-100" style={{ maxWidth: "600px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Mi Lista de Tareas</h2>
          <p className="text-muted">Organiza tus pendientes de forma rápida y sencilla</p>
        </div>

        <div className="d-flex justify-content-end gap-2 mb-3">
          <button
            className={`btn btn-sm ${filter === 'todas' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('todas')}
          >
            📋 Todas
          </button>
          <button
            className={`btn btn-sm ${filter === 'pendiente' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFilter('pendiente')}
          >
            ⏳ Pendientes
          </button>
          <button
            className={`btn btn-sm ${filter === 'completada' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFilter('completada')}
          >
            ✅ Completadas
          </button>
        </div>

        <form onSubmit={handleAddTask} className="input-group mb-4 shadow-sm">
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="Escribe una nueva tarea..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success rounded-end">
            <i className="bi bi-plus-circle me-1"></i> Agregar
          </button>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="list-group mb-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="list-group-item d-flex justify-content-between align-items-center shadow-sm rounded mb-2"
              >
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-3"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                  />
                  {editingId === task.id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm me-2"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onBlur={() => handleUpdateTask(task.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdateTask(task.id);
                      }}
                    />
                  ) : (
                    <span
                      className={`me-2 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}
                      onDoubleClick={() => {
                        setEditingId(task.id);
                        setEditingText(task.title);
                      }}
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No hay tareas pendientes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
