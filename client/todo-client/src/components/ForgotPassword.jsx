import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/requestPasswordReset`,
        { email }
      );
      setMessage(res.data.message);
    } catch {
      setMessage("Error al enviar el correo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "400px" }}>
        <h4 className="mb-3 text-center text-primary fw-bold">
          Recuperar Contraseña
        </h4>

        <p className="text-muted text-center mb-4">
          Ingresa tu correo para recibir instrucciones
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-envelope me-2"></i>Enviar instrucciones
          </button>
        </form>

        {message && (
          <div className="alert alert-info text-center mt-3 py-2">
            {message}
          </div>
        )}

        <div className="text-center mt-3">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => navigate("/login")}
          >
            <i className="bi bi-arrow-left-circle me-1"></i> Volver al login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
