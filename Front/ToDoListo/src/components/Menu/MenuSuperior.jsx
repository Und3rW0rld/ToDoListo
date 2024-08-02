import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import calendarIcon from "../../assets/calendar-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import fNotiIcon from "../../assets/f-noti-icon.svg";
import profileImage from "../../assets/profile-img.jpg";
import "./MenuSuperior.css";
import menuDIcon from "../../assets/menu-d-icon.svg";
import logoutIcon from "../../assets/logout-icon.svg";

const MenuSuperior = ({ handleCalendarioClick }) => {
  const [expandedMenu, setExpandedMenu] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showHistoricoMenu, setShowHistoricoMenu] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const handleDocumentClick = (event) => {
      const menuContainer = document.querySelector(".menu-superior");
      if (menuContainer && !menuContainer.contains(event.target)) {
        setShowMenu(false);
        setShowAccountMenu(false);
        setShowHistoricoMenu(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
    setShowAccountMenu(false);
  };

  const toggleExpandedMenu = () => {
    setExpandedMenu(prev => !prev);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu(prev => !prev);
    setShowMenu(false);
  };

  const toggleHistoricoMenu = () => {
    setShowHistoricoMenu(prev => !prev);
  };

  const toggleHistoricoMenuFromHamburger = () => {
    if (!showMenu) {
      setShowMenu(true);
    }
    setShowHistoricoMenu(true);
  };

  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
  };

  const showHamburgerMenu = windowWidth <= 615;
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthNames = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];
  const month = monthNames[monthIndex];
  const formattedDate = `${day} ${month} ${year}`;
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const image = user.profileImageUrl ? user.profileImageUrl : profileImage;
  const userName = user.username || 'Username';
  const email = user.email || 'Email';

  return (
    <div className={expandedMenu ? "menu-superior expanded" : "menu-superior"}>
      <div className="nombre-usuario">Bienvenido, {userName} 👋</div>
      <div className="botones-container">
        <button>
          <img src={searchIcon} alt="" />
        </button>
        <button onClick={toggleHistoricoMenu}>
          <img src={fNotiIcon} alt="" />
        </button>
        <Link to="/calendario">
          <div className="boton-calendar">
            <button onClick={handleCalendarioClick}>
              <img src={calendarIcon} alt="" />
            </button>
          </div>
        </Link>
        <div className="fecha-container">
          {windowWidth > 615 && (
            <span className="fecha">{formattedDate}</span>
          )}
        </div>
        {showHamburgerMenu && (
          <button className="hamburger-menu" onClick={toggleMenu}>
            <img src={menuDIcon} alt="" />
          </button>
        )}
      </div>
      <button className="account-container" onClick={toggleAccountMenu}>
        <img className="profileImg" src={image} alt="" />
      </button>
      {showAccountMenu && (
        <div className="menu-desplegado_account account-menu">
          <div className="profile-container">
            <div className="profile-picture">
              <img src={image} alt="" />
            </div>
            <div className="profile-info">
              <p>{userName}</p>
              <p>{email}</p>
            </div>
          </div>
          <div onClick={handleLogout} className="cerrar-sesion-btn">
            <img src={logoutIcon} alt="" />Cerrar Sesión
          </div>
        </div>
      )}
      {showMenu && (
        <div className="menu-desplegado">
          <button>
            <img src={searchIcon} alt="" />
          </button>
          <button onClick={toggleHistoricoMenuFromHamburger}>
            <img src={fNotiIcon} alt="" />
          </button>
          <div className="boton-calendar">
            <button onClick={handleCalendarioClick}>
              <img src={calendarIcon} alt="" />
            </button>
          </div>
          <div className="fecha-container">
            {windowWidth > 615 && (
              <span className="fecha">{formattedDate}</span>
            )}
          </div>
        </div>
      )}
      {showHistoricoMenu && (
        <div className="menu-desplegado historico-menu">
          <div className="historico-title">Historico</div>
          <div className="historico-message">No hay cambios por ver</div>
        </div>
      )}
    </div>
  );
};

export default MenuSuperior;
