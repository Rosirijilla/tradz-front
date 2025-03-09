import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import '../../styles/Profile.css'

const ProfileActions = () => {
  const navigate = useNavigate();
  const { profile, handleLogout } = useContext(UserContext);

  const handleCerrarSesion = () => {
    handleLogout();
    navigate('/principal');
  };

  return (
    <div className="d-flex flex-column gap-2 align-items-center">
          <Link to='/edit-profile'>
          <button className='btn-actions'>Editar perfil</button>
          </Link>

          {profile?.tipo_usuario === 'vendedor' && (
        <Link to='/feed'>
          <button className='btn-actions'>Mis publicaciones</button>
        </Link>
      )}

          {/* <Link to='/purchases'>
          <button className='btn-actions'>Mis compras</button>
          </Link> */}

          <button 
            className='btn-actions' 
            onClick={handleCerrarSesion}
          >
            Cerrar sesión
          </button>
    </div>
  );
};

export default ProfileActions;