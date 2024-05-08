import './input.css'

import PropTypes from 'prop-types';

function Input({ text, type, name, onChange, value}) {
	return (
		<div className="entryarea">
			<input className='myInput' type={ type } name={ name } onChange={onChange} value={value} id="" required/>
			<div className="labelline">{ text }</div>
		</div>
	)
}

Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input