import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
