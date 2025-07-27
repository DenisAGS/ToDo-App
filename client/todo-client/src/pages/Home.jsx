import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ThemeToggle from "../components/ThemeToggle";


const Home = () => {
  const navigate = useNavigate();
 
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <ThemeToggle />
      <div className="mb-4 text-center">
        <h1 className="fw-bold text-primary mb-3">
          <i className="bi bi-check2-square me-2"></i>Bienvenido a ToDoApp
        </h1>
        <p className="text-muted mb-0 lead">
          Organiza tus tareas de manera sencilla, rápida y eficiente.
        </p>
      </div>

      <div className="d-flex gap-3 mb-3">
        <button className="btn btn-primary btn-lg shadow" onClick={() => navigate("/login")}>
          <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
        </button>
        <button className="btn btn-outline-secondary btn-lg shadow" onClick={() => navigate("/register")}>
          <i className="bi bi-person-plus me-2"></i>Registrarse
        </button>
      </div>
    </div>
  );
};

export default Home;