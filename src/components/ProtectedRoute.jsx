import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
  return isLoggedIn === "true" ? children : null;
};

export default ProtectedRoute;
