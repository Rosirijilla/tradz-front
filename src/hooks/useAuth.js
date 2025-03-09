import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};

export default useAuth;