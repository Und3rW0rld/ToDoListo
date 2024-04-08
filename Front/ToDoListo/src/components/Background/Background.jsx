import PropTypes from 'prop-types';
import './background.css';
import background from './background.png';

function Background({ display }) {
	return (
		<img className={display} src={background} alt="" />
	);
}

Background.propTypes = {
	display: PropTypes.string.isRequired,
};

export default Background;
