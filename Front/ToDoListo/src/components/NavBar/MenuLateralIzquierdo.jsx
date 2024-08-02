// MenuLateralIzquierdo.js
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-app.svg";
import menuIcon from "../../assets/menu-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";
import calendarIcon from "../../assets/calendar-icon.svg";
import configIcon from "../../assets/config-icon.svg";
import logoutIcon from "../../assets/logout-icon.svg";
import "./menuLateralIzquierdo.css";

function MenuLateralIzquierdo() {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
  }

  return (
    <div className="menu-lateral-izquierdo">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Link to="/menuPrincipal">
        <button>
          <img src={menuIcon} alt="" />
        </button>
      </Link>
      <Link to="/perfil">
        <button>
          <img src={profileIcon} alt="" />
        </button>
      </Link>
      <Link to="/calendario">
        <button>
          <img src={calendarIcon} alt="" />
        </button>
      </Link>
      <Link to="/config">
        <button>
          <img src={configIcon} alt="" />
        </button>
      </Link>
      <button onClick={handleLogout} className="logout-btn">
        <img src={logoutIcon} alt="" />
      </button>
    </div>
  );
}

export default MenuLateralIzquierdo;
