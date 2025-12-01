import axios from "axios";
import { useNavigate } from "react-router-dom";


const Logout = async () => {
    try {
           const navigate = useNavigate();
  await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
  localStorage.clear();
  navigate("/login");

    } catch (error) {
        console.log(error);
        
    }
}

export default Logout;