import "./CrearTareaWindow.css";
import PropTypes from 'prop-types';
import CrearCategoriasWindow from "../CreateCategory/CrearCategoriasWindow";
import { useEffect, useState } from "react";
import addIcon from "../../assets/add-icon.svg";

const CrearTareaWindow = ({
  onClose,
  categorias,
  onNuevaTarea,
  handleCategoriaSubmit,
  onEditarTarea,
  tarea
}) => {

  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    if (tarea != null) {
      console.log("No esta nulo")
      setIsEdited(true)
    }
  }, [])

  const [showCrearCategoriaWindow, setShowCrearCategoriaWindow] =
    useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({
    taskName: "",
    priority: "",
    date: "",
    categories: [],
    description: "",
    state: "TO_DO",
  });

  const handleCrearCategoriaClick = () => {
    setShowCrearCategoriaWindow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === 'categories'){
      setNuevaTarea({
        ...nuevaTarea,
        [name]: [value],
      });
    }else{
    setNuevaTarea({
      ...nuevaTarea,
      [name]: value,
    });}
  };

  const handleEditarTarea = () => {
    if (nuevaTarea.taskName != "") {
      tarea.taskName = nuevaTarea.taskName
    }

    if (nuevaTarea.priority != "") {
      tarea.priority = nuevaTarea.priority
    }

    if (nuevaTarea.date != "") {
      tarea.date = nuevaTarea.date
    }

    if (nuevaTarea.categories.length > 0) {
      tarea.categories = nuevaTarea.categories
    }

    if (nuevaTarea.description != "") {
      tarea.description= nuevaTarea.description
    }

    onEditarTarea(tarea)
  }

  const handleGuardarClick = () => {
    onNuevaTarea(nuevaTarea);
    setNuevaTarea({
      taskName: "",
      priority: "",
      date: "",
      categories: [],
      description: "",
      state: "TO_DO",
    });
    console.log(nuevaTarea);
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="crear-tarea-window-overlay">
      <div className="crear-tarea-window">
        <h2 className="crear-tarea-title">{isEdited ? "Editar tarea" : "Crear tarea"}</h2>
        <hr className="separator" />
        <input
          type="text"
          placeholder={isEdited ? tarea.taskName : "Nombre de la tarea"}
          className="input-crear-tarea"
          name="taskName"
          value={nuevaTarea.name}
          onChange={handleInputChange}
        />
        <div className="checkbox-container">
          <div className="check-item">
            <input
              id="importante"
              type="radio"
              name="priority"
              className="checkbox"
              value="IMPORTANT"
              onChange={handleInputChange}
              checked={nuevaTarea.priority === "IMPORTANT"}
            />
            <label htmlFor="importante" className={isEdited ? tarea.priority == "IMPORTANT" ? "poderoso" : "" : ""}>Importante</label>
          </div>
          <div className="check-item">
            <input
              id="habitual"
              type="radio"
              name="priority"
              className="checkbox"
              value="HABITUAL"
              onChange={handleInputChange}
              checked={nuevaTarea.priority === "HABITUAL"}
            />
            <label htmlFor="habitual" className={isEdited ? tarea.priority == "HABITUAL" ? "poderoso" : "" : ""}>Habitual</label>
          </div>
          <div className="check-item">
            <input
              id="poco-importante"
              type="radio"
              name="priority"
              className="checkbox"
              value="NO_IMPORTANT"
              onChange={handleInputChange}
              checked={nuevaTarea.priority === "NO_IMPORTANT"}
            />
            <label htmlFor="poco-importante" className={isEdited ? tarea.priority == "NO_IMPORTANT" ? "poderoso" : "" : ""}>Poco Importante</label>
          </div>
        </div>
        <div className="group-inputs-task">
          <input
            type="date"
            className="input-crear-tarea input-date"
            name="date"
            value={nuevaTarea.date}
            onChange={handleInputChange}
          />
          <select
            className="input-crear-tarea input-category"
            name="categories"
            value={nuevaTarea.categories}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Categoría
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          <button
            className="btn-crear-categoria"
            onClick={handleCrearCategoriaClick}
          >
            <img src={addIcon} alt="" />
          </button>
        </div>

        <textarea
          placeholder={isEdited ? tarea.description : "Ingresa una descripción de la tarea"}
          className="textarea-field"
          name="description"
          value={nuevaTarea.description}
          onChange={handleInputChange}
        />
        <div className="button-container">
          <button className="btn-save" onClick={isEdited ? handleEditarTarea : handleGuardarClick}>
            Guardar Cambios
          </button>
          <button className="btn-cancel" onClick={handleCancelClick}>
            Cancelar
          </button>
        </div>
        <div className="button-container"></div>
        {showCrearCategoriaWindow && (
          <CrearCategoriasWindow
          onCategoriaSubmit={handleCategoriaSubmit}
          onClose={() => {setShowCrearCategoriaWindow(false)}}
        />
        )}
      </div>
    </div>
  );
};
CrearTareaWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  onNuevaTarea: PropTypes.func.isRequired,
  handleCategoriaSubmit: PropTypes.func.isRequired,
};

export default CrearTareaWindow;
