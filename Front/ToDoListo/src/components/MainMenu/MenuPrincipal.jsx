import ConsultarTareas from "../../Views/Tasks/ConsultarTareas";
import Categorias from "../../Views/Categories/Categorias";
import CrearTareaWindow from "../CreateTask/CrearTareaWindow";
import "./MenuPrincipal.css";
import supIcon from "../../assets/sup-icon.svg";
import { useState, useEffect } from "react";
import { createCategory, createTask, getAllCategories, updateTask, updateCategory } from "../../client";

const MenuPrincipal = () => {
  const [activeTab, setActiveTab] = useState("consultarTareas");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [categorias, setCategorias] = useState([]);
  const handleCategoriaSubmit = (nuevaCategoria) => {
    // Si todas las verificaciones pasan, puedes enviar los datos del formulario al servidor o realizar otras acciones
    const user_id = localStorage.getItem("userId");
    const categoria = { name: nuevaCategoria, userId: user_id };
    createCategory(categoria)
      .then(() => {
        console.log("Categoria creada!");
        alert("Categoria creada exitosamente");
      })
      .catch((err) => {
        console.log(err.response);
      });
    setCategorias([...categorias, nuevaCategoria]);
    
  };
  const handleCategoriaUpdate = (categoriaAnterior, nuevaCategoria) => {
    const user_id = localStorage.getItem("userId");
    const categoria = { name: nuevaCategoria, userId: user_id };
    const index = categorias.indexOf(categoriaAnterior);
    updateCategory(categoriaAnterior, categoria)
      .then(() => {
        console.log("Categoria editada!");
        alert("Categoria actualizada exitosamente");
      })
      .catch((err) => {
        console.log(err.response);
      });
    categorias[index] = nuevaCategoria;
  }

  const agregarTarea = (nuevaTarea) => {
    const user_id = localStorage.getItem("userId");
    nuevaTarea.userId = user_id;
    console.log(nuevaTarea);
    createTask(nuevaTarea).then(() => {
      console.log("Tarea creada!");
      alert("Tarea creada exitosamente");
    })
    .catch((err) => {
      console.log(err.response);
    });
  };

  const actualizarTarea = (id, task) => {
    updateTask(id, task).then(() => {
      console.log("Tarea editada!");
      alert("Tarea editada exitosamente");
    })
    .catch((err) => {
      console.log(err.response);
    });
  };

  useEffect(() => {
    // Obtener todas las categorías al montar el componente
    const user_id = localStorage.getItem("userId");
    getAllCategories(user_id)
      .then((categorias) => {
        setCategorias(categorias.map((categoria) => categoria.name));
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNuevaCategoria = (nuevaCategoria) => {
    setCategorias([...categorias, nuevaCategoria]);
  };

  return (
    <div className="menu-principal">
      <div className="tabs">
        <div
          className={activeTab === "consultarTareas" ? "tab active" : "tab"}
          onClick={() => handleTabClick("consultarTareas")}
        >
          <img className="supIcon" src={supIcon} alt="" />
          {windowWidth <= 590 ? "Consultar" : "Consultar Tareas"}
        </div>
        <div
          className={activeTab === "categorias" ? "tab active" : "tab"}
          onClick={() => handleTabClick("categorias")}
        >
          <img className="supIcon" src={supIcon} alt="" />
          Categorías
        </div>
        <div className="options-right">
          <div className="option">Filtrar</div>
          <div
            className="option create-task-btn"
            onClick={() => handleTabClick("crearTarea")}
          >
            {windowWidth <= 590 ? "Crear" : "Crear Tareas"}
          </div>
        </div>
      </div>
      <div className="content">
        {activeTab === "consultarTareas" && (
          <ConsultarTareas
            categorias={categorias}
            onNuevaCategoria={handleNuevaCategoria}
            handleCategoriaSubmit={handleCategoriaSubmit}
            agregarTarea={agregarTarea}
          />
        )}
        {activeTab === "categorias" && (
          <Categorias categorias={categorias} setCategorias={setCategorias} handleCategoriaSubmit={handleCategoriaSubmit}
          handleCategoriaUpdate={handleCategoriaUpdate} editable={true}/>
        )}
        {activeTab === "crearTarea" && (
          <CrearTareaWindow
            onClose={() => handleTabClick("consultarTareas")}
            categorias={categorias}
            handleCategoriaSubmit={handleCategoriaSubmit}
            onNuevaTarea={agregarTarea}
          />
        )}
      </div>
    </div>
  );
};

export default MenuPrincipal;
