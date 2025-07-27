import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from "../components/ThemeToggle";

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
            alert(res.data.message || 'Registro exitoso');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar');
        }
    };

    return (
        <div className="mt-5 d-flex justify-content-center align-items-center bg-body px-3">
            <ThemeToggle />
            <div className="card shadow-lg p-4 rounded-4 fade-in w-100" style={{ maxWidth: "420px" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-plus-fill fs-1 text-primary"></i>
                    <h3 className="mt-2 fw-bold">Crear cuenta</h3>
                    <p className="text-muted">Regístrate para comenzar</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control rounded-3"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ingresa tu nombre completo"
                            required
                        />
                    </div>
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
                            className="form-control rounded-3"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Crea una contraseña segura"
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger rounded-3 py-2 px-3">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold py-2 mt-2">Registrarse</button>
                </form>

                <div className="text-center mt-4">
                    <small className="text-muted">
                        ¿Ya tienes cuenta? <a href="/login" className="text-primary fw-semibold">Inicia sesión</a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;
