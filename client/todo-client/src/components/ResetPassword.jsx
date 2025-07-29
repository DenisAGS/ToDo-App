import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resetPassword/${token}`,
        { password }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch{
      setError("Token inválido o expirado");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "400px" }}>
        <h4 className="mb-3 text-center text-primary fw-bold">
          Restablecer Contraseña
        </h4>

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Nueva contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Repite la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-shield-lock me-2"></i> Restablecer contraseña
          </button>
        </form>

        {error && (
          <div className="alert alert-danger text-center mt-3 py-2">
            {error}
          </div>
        )}

        {message && (
          <div className="alert alert-success text-center mt-3 py-2">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
