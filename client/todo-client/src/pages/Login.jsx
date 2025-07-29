import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";
import "../index.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSumit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);
            localStorage.setItem('token', res.data.token);
            alert('Inicio de sesión exitoso');
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.error || "Error al iniciar sesión");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-body px-3"
            style={{ minHeight: "calc(100vh - 20px)" }}>
            <ThemeToggle />
            <div className="card shadow-lg p-4 rounded-4 fade-in w-100"
                style={{ maxWidth: "420px" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-lock-fill fs-1 text-primary"></i>
                    <h3 className="mt-2 fw-bold">Iniciar sesión</h3>
                    <p className="text-muted">Accede con tu cuenta</p>
                </div>

                <form onSubmit={handleSumit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control rounded-3"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Ingresa tu correo electrónico"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger rounded-3 py-2 px-3">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold py-2 mt-2">Iniciar sesión</button>
                </form>

                <div className="text-center mt-4">
                    <small className="text-muted">
                        ¿Olvidaste tu contraseña? <a href="/forgot-password" className="text-primary fw-semibold">Recuperar</a>
                        <br />
                        ¿No tienes cuenta?{" "}
                        <span
                            className="text-primary fw-semibold"
                            role="button"
                            onClick={() => navigate("/register")}
                        >
                            Regístrate
                        </span>
                    </small>
                </div>

            </div>
        </div>
    );
};

export default Login;