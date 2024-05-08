// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Views/Routes/Dashboard";
import LoginRegister from "./Views/LoginRegister/LoginRegister";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} /> {/* Ruta para el formulario de inicio de sesión */}
        <Route path="/*" element={<Dashboard />} /> {/* Ruta para el resto de la aplicación */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
