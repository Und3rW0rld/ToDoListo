import CrearTareaWindow from "../../components/CreateTask/CrearTareaWindow";
import "./ConsultarTareas.css";
import folderIcon from "../../assets/folder-icon.svg";
import { useState, useEffect } from "react";
import addIcon from "../../assets/add-icon.svg";
import { getAllTask } from "../../client";
import Task from "../../components/Task/Task";
import PropTypes from 'prop-types';

const ConsultarTareas = ({ categorias, agregarTarea, handleCategoriaSubmit }) => {
  const [showCrearTareaWindow, setShowCrearTareaWindow] = useState(false);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    // Obtener todas las categorías al montar el componente
    const user_id = localStorage.getItem("userId");
    getAllTask(user_id)
      .then((tasks) => {
        if(tasks == null) tasks = [];
        setTareas(tasks);
      })
      .catch((error) => {
        console.error("Error al obtener las tareas:", error);
      });
  }, []);

  const handleCrearTareaClick = () => {
    setShowCrearTareaWindow(true);
  };

  const handleCrearTareaWindowClose = () => {
    setShowCrearTareaWindow(false);
  };

  const agregarTareaFunc = (nuevaTarea) => {
    agregarTarea(nuevaTarea);
    console.log("ESTA ES LA TAREAAAA")
    console.log(nuevaTarea)
    setTareas([...tareas, nuevaTarea]);
    setShowCrearTareaWindow(false);
  }

  const tareasPorHacer = tareas.filter(tarea => tarea.state === 'TO_DO');
  const tareasCompletadas = tareas.filter(tarea => tarea.state === 'COMPLETED');
  const tareasPendientes = tareas.filter(tarea => tarea.priority === 'PENDING');

  return (
    <div className="consultar-tareas-container">
      
        {tareas.length === 0 ? (
          <>
          <div className="mensaje">
            <img className="folderImg" src={folderIcon} alt="" />
            <p className="no-tareas">No tienes ninguna tarea!</p>
            <p className="crear-tarea">Crea tu primera tarea</p>
            <button className="crear-tarea-btn" onClick={handleCrearTareaClick}>
              <span className="crear-tarea-btn-text">Crear Tarea</span>
              <img src={addIcon} alt="" />
            </button>
            </div>
          </>
        ) : (
          <>
          <div className="tareas-container">
          <div className="todo-tasks task-group">
            <h3 className="task-status-title">Por hacer ({tareasPorHacer.length})</h3>
            {tareasPorHacer.map((tarea, index) => (
              <Task key={index} tarea={tarea}/>
              
            ))}
          </div>
          <div className="tareas-habituales task-group">
          <h3 className="task-status-title">Terminadas ({tareasCompletadas.length})</h3>
            {tareasCompletadas.map((tarea, index) => (
              <Task key={index} tarea={tarea}/>
            ))}
          </div>
          <div className="tareas-poco-importantes task-group">
          <h3 className="task-status-title">Expiradas ({tareasPendientes.length})</h3>
          {tareasPendientes.map((tarea, index) => (
              <Task key={index} tarea={tarea}/>
            ))}
          </div>
          </div>
          </>
        )}
        {showCrearTareaWindow && (
          <CrearTareaWindow
            onClose={handleCrearTareaWindowClose}
            categorias={categorias}
            onNuevaTarea={agregarTareaFunc}
            handleCategoriaSubmit={handleCategoriaSubmit}
          />
        )}
        </div>
  );
};

ConsultarTareas.propTypes = {
  categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  agregarTarea: PropTypes.func.isRequired,
  handleCategoriaSubmit: PropTypes.func.isRequired,
};

export default ConsultarTareas;
