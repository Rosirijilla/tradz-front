import AppRoutes from "./routes/Routes";
import { useContext } from "react";
import { UserContext, UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useLocation } from 'react-router-dom';

function App() {
  const { token } = useContext(UserContext);
  const location = useLocation();

  // Rutas donde se oculta el Header
  const hideHeaderRoutes = ["/principal", "/profile", "/cart", "/login", "/register", "/edit-profile", "/search"];
  const isPrincipalRoute = location.pathname === "/principal";
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <UserProvider>
      <div className="d-flex flex-column min-vh-100 all-body">
        {/* Navbar solo se oculta en "/principal" */}
        {!isPrincipalRoute && <Navbar />}
        <div className="flex-grow-1">
          {/* Header se oculta en ciertas rutas */}
          {!hideHeader && <Header />}
          <AppRoutes />
        </div>
        {/* Footer solo se oculta en "/principal" */}
        {!isPrincipalRoute && <Footer />}
      </div>

      {/* ToastContainer global para toda la aplicación */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
    </UserProvider>
  );
}

export default App;
