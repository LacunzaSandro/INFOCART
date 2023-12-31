import './Loader.scss';

// eslint-disable-next-line react/prop-types
function Loader({ size }) {
  return (
    <div className="loader">
      <div className="loader__icon" style={{ width: size, height: size }} />
    </div>
  );
}

export default Loader;