import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const UserInfo = () => {
  const { profile } = useContext(UserContext);

  return (
    <div className="text-start">
      <h4>{profile.nombre}</h4>
      <p><b>E-mail:</b> {profile.email}</p>
      <p><b>Número de teléfono:</b> {profile.telefono}</p>
      <p><b>Dirección:</b> {profile.direccion}</p>
      <p><b>Fecha de registro:</b> {profile.fecha_registro}</p>
      <p><b>Tipo de usuario:</b> {profile.tipo_usuario}</p>
    </div>
  );
};

export default UserInfo;
