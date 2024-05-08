import React from "react";
import { Link } from "react-router-dom";
import calendarIcon from "../../assets/calendar-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import fNotiIcon from "../../assets/f-noti-icon.svg";
import profileImage from "../../assets/profile-img.jpg";
import "./MenuSuperior.css";
import menuDIcon from "../../assets/menu-d-icon.svg";
import logoutIcon from "../../assets/logout-icon.svg";

class MenuSuperior extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedMenu: true,
      windowWidth: window.innerWidth,
      showMenu: false,
      showAccountMenu: false,
      showHistoricoMenu: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.toggleExpandedMenu = this.toggleExpandedMenu.bind(this);
    this.toggleAccountMenu = this.toggleAccountMenu.bind(this);
    this.toggleHistoricoMenu = this.toggleHistoricoMenu.bind(this);
    this.toggleHistoricoMenuFromHamburger =
      this.toggleHistoricoMenuFromHamburger.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    document.addEventListener("click", this.handleDocumentClick);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("click", this.handleDocumentClick);
  }

  handleResize() {
    const newWidth = window.innerWidth;
    this.setState({ windowWidth: newWidth });

    if (newWidth > 615 && this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  }

  toggleMenu() {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
      showAccountMenu: false,
    }));
  }

  toggleExpandedMenu() {
    this.setState((prevState) => ({
      expandedMenu: !prevState.expandedMenu,
    }));
  }

  toggleAccountMenu() {
    this.setState((prevState) => ({
      showAccountMenu: !prevState.showAccountMenu,
      showMenu: false,
    }));
  }

  toggleHistoricoMenu() {
    this.setState((prevState) => ({
      showHistoricoMenu: !prevState.showHistoricoMenu,
    }));
  }

  toggleHistoricoMenuFromHamburger() {
    if (!this.state.showMenu) {
      this.setState({ showMenu: true });
    }

    this.setState({ showHistoricoMenu: true });
  }

  handleDocumentClick(event) {
    const menuContainer = document.querySelector(".menu-superior");
    if (menuContainer && !menuContainer.contains(event.target)) {
      this.setState({
        showMenu: false,
        showAccountMenu: false,
        showHistoricoMenu: false,
      });
    }
  }

  render() {
    const showHamburgerMenu = this.state.windowWidth <= 615;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const month = monthNames[monthIndex];
    const formattedDate = `${day} ${month} ${year}`;
    const userName = JSON.parse(localStorage.getItem('user')).username ? JSON.parse(localStorage.getItem('user')).username : 'Username';
    const email = JSON.parse(localStorage.getItem('user')).email ? JSON.parse(localStorage.getItem('user')).email : 'Username';
    
    return (
      <div
        className={
          this.state.expandedMenu ? "menu-superior expanded" : "menu-superior"
        }
      >
        <div className="nombre-usuario">Bienvenido, { userName } 👋</div>
        <div className="botones-container">
          <button>
            <img src={searchIcon} alt="" />
          </button>
          <button onClick={this.toggleHistoricoMenu}>
            <img src={fNotiIcon} alt="" />
          </button>
          <Link to="/calendario">
            <div className="boton-calendar">
              <button onClick={this.props.handleCalendarioClick}>
                <img src={calendarIcon} alt="" />
              </button>
            </div>
          </Link>
          <div className="fecha-container">
            {this.state.windowWidth > 615 && (
              <span className="fecha">{formattedDate}</span>
            )}
          </div>
          {showHamburgerMenu && (
            <button className="hamburger-menu" onClick={this.toggleMenu}>
              <img src={menuDIcon} alt="" />
            </button>
          )}
        </div>
        <button className="account-container" onClick={this.toggleAccountMenu}>
        <img className="profileImg" src={profileImage} alt="" />
        </button>
        {this.state.showAccountMenu && (
          <div className="menu-desplegado_account account-menu">
            <div className="profile-container">
              <div className="profile-picture">
                <img src={profileImage} alt="" />
              </div>
              <div className="profile-info">
                <p>{userName}</p>
                <p>{email}</p>
              </div>
            </div>
            <div className="cerrar-sesion-btn">
              <img src={logoutIcon} alt="" />Cerrar
              Sesión
            </div>
          </div>
        )}
        {this.state.showMenu && (
          <div className="menu-desplegado">
            <button>
              <img src={searchIcon} alt="" />
            </button>
            <button onClick={this.toggleHistoricoMenuFromHamburger}>
            <img src={fNotiIcon} alt="" />
            </button>
            <div className="boton-calendar">
              <button onClick={this.props.handleCalendarioClick}>
                <img src={calendarIcon} alt="" />
              </button>
            </div>
            <div className="fecha-container">
              {this.state.windowWidth > 615 && (
                <span className="fecha">{formattedDate}</span>
              )}
            </div>
          </div>
        )}
        {this.state.showHistoricoMenu && (
          <div className="menu-desplegado historico-menu">
            <div className="historico-title">Historico</div>
            <div className="historico-message">No hay cambios por ver</div>
          </div>
        )}
      </div>
    );
  }
}

export default MenuSuperior;
