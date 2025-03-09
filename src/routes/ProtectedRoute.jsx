import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext); // Verifica si hay un token válido

  return token ? children : <Navigate to="/principal" replace />;
};

export default ProtectedRoute;
