// Dashboard.js
import { Route, Routes } from "react-router-dom";
import MenuLateralIzquierdo from "../../components/NavBar/MenuLateralIzquierdo";
import MenuSuperior from "../../components/Menu/MenuSuperior";
import Perfil from "../Profile/Perfil";
import Calendario from "../Calendar/Calendario";
import Config from "../Config/Config";
import MenuPrincipal from "../../components/MainMenu/MenuPrincipal";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <MenuLateralIzquierdo />
      <div className="menu-superior">
        <MenuSuperior />
      </div>
      <div className="zona-de-trabajo">
        <Routes>
          <Route path="/menuPrincipal" element={<MenuPrincipal />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
