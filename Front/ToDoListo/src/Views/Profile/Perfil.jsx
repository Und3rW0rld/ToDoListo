import React, { useState } from "react";
import Input from "../../components/Input/Input";
import "./perfil.css";

const Perfil = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSaveChanges = () => {
    console.log("Cambios guardados:", { username, email, password });
  };

  return (
    <div className="profile-wrapper">
      <div className="perfil-container">
        <h2 className="titulo-perfil">Edita tu perfil</h2>

        <div className="inputs-container">
          <Input
            text="Nombre de Usuario"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="Input"
          />
          <Input
            text="Correo"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="Input"
          />
          <Input
            text="Contraseña"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="Input"
          />
        </div>

        <button className="save-changes-btn" onClick={handleSaveChanges}>
          Guardar cambios
        </button>
      </div>

      <div className="photo-container">
        <button className="change-photo-btn">Cambiar Foto</button>
      </div>
    </div>
  );
};

export default Perfil;
