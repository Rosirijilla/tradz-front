import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Login - Intentando iniciar sesión con:', email);
      await handleLogin(email, password);
      console.log('Login - Inicio de sesión exitoso');
    } catch (error) {
      console.error('Login - Error:', error);
      setError(error.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container col-12 col-md-8 col-lg-6 mt-5 mb-5'>
      <h2 className='mb-5'>Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className='col-10 mx-auto' onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='d-flex flex-column text-center'>
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : 'Iniciar sesión'}
          </button>
          <p>¿No tienes cuenta? <Link to='/register'>Regístrate</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;