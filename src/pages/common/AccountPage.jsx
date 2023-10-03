import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "../../context/AuthContext";
import { TOKEN } from "../../constants";

const AccountPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/");
  };
  return (
    <div>
      <h2>AccountPage</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AccountPage;
