import PropTypes from 'prop-types';
import { useState } from 'react';
import taskMenu from '../../assets/task-menu.svg';
import dropDown from '../../assets/arrow_drop_down.svg';
import dropUp from '../../assets/arrow_drop_up.svg';

const Task = ({ tarea }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


	const handleMenuClick = (e) => {
		e.stopPropagation();
		if(showMenu){
			setShowMenu(false);
		}
	};

  const handleOptionClick = (option) => {
    // Aquí puedes agregar la lógica para manejar la opción seleccionada
    console.log("Opción seleccionada:", option);
    // Por ejemplo, podrías llamar a funciones específicas para cada opción
    // o pasar el nombre de la opción como parámetro a una función proporcionada como prop
  };

  return (
    <div className="tarea" onClick={handleMenuClick} >
      <div className="name-container">
        <h3 className="task-name">{tarea.taskName}</h3>
        <img src={taskMenu} alt="Task Menu" onClick={toggleMenu} />
				<div className='menu-container'>
        {showMenu && (
          <ul className="menu-options">
            <li onClick={() => handleOptionClick("Editar")}>Editar</li>
            <li onClick={() => handleOptionClick("Eliminar")}>Eliminar</li>
            {/* Puedes agregar más opciones según tus necesidades */}
          </ul>
        )}
      </div>
      </div>
      <div className="task-categories">
        {tarea.categories.map((category, index) => (
          <p key={index} className="task-category">
            {category.name}
          </p>
        ))}
      </div>
      <p className="task-priority">
        Prioridad:
        {tarea.priority === 'IMPORTANT' && ' Tarea importante'}
        {tarea.priority === 'HABITUAL' && ' Tarea habitual'}
        {tarea.priority === 'NO_IMPORTANT' && ' Poco Importante'}
        <hr className={tarea.priority} />
      </p>
      <div className='description-task-container' onClick={toggleDescription}>
        
        {!showFullDescription && (
					<>
						<p >
						<strong>Descripción: </strong>{`${tarea.description.substring(0, 13)}${tarea.description.length <= 13 ? '' : ' ...'}`}
						</p>
						{tarea.description.length > 13 && (
          <img src={dropDown}  />)}
					</>
        )}
        {showFullDescription && (
					<>
					<p><strong>Descripción: </strong>{tarea.description}</p>
					{tarea.description.length > 13 && (
          <img src={dropUp}  />)}
					</>
        )}
      </div>
      <div className="date-container">
        <p className="task-date">{tarea.date}</p>
      </div>
    </div>
  );
};

Task.propTypes = {
  tarea: PropTypes.shape({
    taskName: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    priority: PropTypes.oneOf(['IMPORTANT', 'HABITUAL', 'NO_IMPORTANT']).isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
export default Task;
