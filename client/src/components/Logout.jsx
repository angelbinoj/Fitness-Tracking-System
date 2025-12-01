
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
     const logoutUser = async () => {
    try {
      await axios.post("https://fitness-system-backend.vercel.app/api/auth/logout", {}, { withCredentials: true });
      localStorage.clear();
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.clear();
      navigate("/login"); 
    }
  };
  logoutUser();
  }, [navigate])
};

export default Logout;
