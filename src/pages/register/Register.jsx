import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import '../../styles/Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const { setProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    telefono: '',
    direccion: '',
    tipo_usuario: 'comprador' // o vendedor
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.register(formData);
      if (response.token) {
        toast.success('¡Registro exitoso! Serás redirigido al inicio de sesión...', {
          position: "top-center",
          autoClose: 2000
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error en el registro', {
        position: "top-center",
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container col-12 col-md-8 col-lg-6 mt-5 mb-5">
        <h2 className='text-center mb-5'>Completa los datos para registrarte</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className='col-10 mx-auto' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <span className='text-danger'>*</span>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <span className='text-danger'>*</span>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <span className='text-danger'>*</span>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <span className='text-danger'>*</span>
            <input
              type="tel"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <span className='text-danger'>*</span>
            <input
              type="text"
              name="direccion"
              className="form-control"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de Usuario</label>
            <span className='text-danger'>*</span>
            <select
              name="tipo_usuario"
              className="form-control"
              value={formData.tipo_usuario}
              onChange={handleChange}
              required
            >
              <option className='tipo-usuario' value="comprador">Comprador</option>
              <option className='tipo-usuario' value="vendedor">Vendedor</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary mx-auto d-block mt-4 mb-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : 'Registrarse'}
          </button>
          <p className='text-center'>¿Ya tienes una cuenta? <Link to='/login'>Iniciar sesión</Link></p>
        </form>
      </div>
    </>
  );
};

export default Register;