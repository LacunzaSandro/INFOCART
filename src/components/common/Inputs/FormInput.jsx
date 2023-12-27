
import "./formInput.css";

const FormInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, errorMessage, onChange,error, ...inputProps } = props;



  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
      />
		<div className="error-container">
			<span className={`error-message ${error ? 'active' : ''}`}>
				{errorMessage}
			</span>
		</div>
    </div>
  );
};

export default FormInput;