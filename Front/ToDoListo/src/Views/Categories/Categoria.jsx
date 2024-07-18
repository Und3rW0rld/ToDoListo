import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import "./Categoria.css";
import { useState } from "react";
import taskMenu from "../../assets/task-menu.svg";

function Categoria ({ categoria, categorias, setCategorias, index, handleEliminarCategoria, handleEditarCategoria }) {

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
    	if(option === "Eliminar"){
			handleEliminarCategoria(index);
		}
		else if (option === "Editar"){
			handleEditarCategoria(index);
		}
  };

	const [{ isDragging }, drag] = useDrag({
		type: "CATEGORIA",
		item: { index },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: "CATEGORIA",
		hover: (item) => {
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const updatedCategorias = [...categorias];
			const dragCategoria = updatedCategorias[dragIndex];

			updatedCategorias.splice(dragIndex, 1);
			updatedCategorias.splice(hoverIndex, 0, dragCategoria);

			setCategorias(updatedCategorias);
			item.index = hoverIndex;
		},
	});

	return (
		<div className="categoria-container"
			ref={(node) => drag(drop(node))}
			style={{ border: isDragging ? "3px dashed black" : "none"}}>
			<div onClick={handleMenuClick} className="categoria" style={{ opacity: isDragging ? .5 : 1,}}>
				<div className="categoria-header">
					<h2 className="categoria-title">
						{categoria}
					</h2>
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
				<div className="categoria-footer">
					<div className="tasks-counter">
						<p className="task-counter">Tareas: 0</p>
						<p className="task-counter">Tareas importantes: 0</p>
						<p className="task-counter">Tareas habituales: 0</p>
						<p className="task-counter">Tareas poco importantes: 0</p>
					</div>
					<button className="btn-add-tasks-category">Agregar tarea</button>
				</div>
			</div>
		</div>
	);
}

Categoria.propTypes = {
	categoria: PropTypes.string.isRequired,
	categorias: PropTypes.array.isRequired,
	setCategorias: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	handleEliminarCategoria: PropTypes.func.isRequired,
	handleEditarCategoria: PropTypes.func.isRequired
};

export default Categoria;
