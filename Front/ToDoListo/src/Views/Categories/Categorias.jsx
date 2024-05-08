import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CrearCategoriasWindow from "../../components/CreateCategory/CrearCategoriasWindow";
import {  deleteCategory } from "../../client";
import Categoria from "./Categoria";
import "./Categorias.css";

const Categorias = ({ categorias, setCategorias, handleCategoriaSubmit }) => {
  const [mostrarCrearCategoria, setMostrarCrearCategoria] = useState(false);

  const handleToggleCrearCategoria = () => {
    setMostrarCrearCategoria(!mostrarCrearCategoria);
  };
  
  const handleEliminarCategoria = (index) => {
    const cat = categorias[index];
    console.log(cat);
    // Eliminar la categoría del servidor
    deleteCategory(cat);
    const updatedCategorias = categorias.filter((_, i) => i !== index);
    setCategorias(updatedCategorias);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="categorias-container">
        <h2 className="categorias-title">Categorías</h2>
        <div className="categorias">
          <div className="categories-header">
            <h2 className="categories-num">Categorías ({categorias.length})</h2>
            <button className="btn-categories" onClick={handleToggleCrearCategoria}>
              Crear Categoría
            </button>
          </div>

          {categorias.map((categoria, index) => (
            <Categoria
              key={index}
              categoria={categoria}
              categorias={categorias}
              setCategorias={setCategorias}
              handleEliminarCategoria={handleEliminarCategoria}
              index={index}
            />
          ))}

          {mostrarCrearCategoria && (
            <CrearCategoriasWindow
              onCategoriaSubmit={handleCategoriaSubmit}
              onClose={() => {setMostrarCrearCategoria(false)}}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Categorias;
