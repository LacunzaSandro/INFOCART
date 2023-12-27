import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        width: "70%",
        height: "180px",
        background: "#fff",
        margin: "30px auto",
      }}
    >
      <h2>No Match</h2>
      <p>La página que estás buscando no existe.</p>
      <Link to="/">
        <button style={{ padding: "10px", margin: "10px", cursor: "pointer", }}>
          Ir a la página principal
        </button>
      </Link>
    </div>
  );
};

export default NoMatch;
