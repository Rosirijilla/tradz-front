import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import '../../styles/Profile.css';

const ProfileImage = () => {
  const { profile } = useContext(UserContext);

  return (
    <div className="container mb-3">
       <img src={profile.imagen_url} alt={profile.nombre} className='img-perfil' />
    </div>
  );
};

export default ProfileImage;