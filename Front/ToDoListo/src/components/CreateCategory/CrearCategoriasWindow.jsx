import { useState } from "react";
import "./CrearCategoriasWindow.css";
import PropTypes from "prop-types";

const CrearCategoriasWindow = ({ onCategoriaSubmit, onClose }) => {


CrearCategoriasWindow.propTypes = {
  onCategoriaSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const handleCategoriaChange = (e) => {
    setNuevaCategoria(e.target.value);
  };

  const handleCategoriaSubmit = (e) => {
    e.preventDefault();
    if (nuevaCategoria.trim() !== "") {
      onCategoriaSubmit(nuevaCategoria);
      setNuevaCategoria("");
      onClose();
    }else{
      alert("Por favor introduce un nombre de categoría válido");
    }
  };

  return (
    <div className="crear-categoria-window-overlay">
      <div className="crear-categoria-window">
      <h2 className="crear-categoria-title">Nueva Categoría</h2>
      <hr />
      <form className="form-crear-categoria" onSubmit={handleCategoriaSubmit}>
        <input
          className="input-crear-categoria"
          type="text"
          placeholder="Ingresa el nombre de la categoría"
          value={nuevaCategoria}
          onChange={handleCategoriaChange}
        />
        <div className="btns-crear-categoria">
        <button className="btn-save" type="submit">Guardar Cambios</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        </div>
        
      </form>
    </div>
    </div>
    
  );
};

export default CrearCategoriasWindow;
