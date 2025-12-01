
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); 

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

  return logoutUser;
};

export default Logout;
