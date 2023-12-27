import style from "../../pages/categories/CategoryEdit.module.css";

const CategoryViewer = ({ data, setData, onSubmit, action }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={`${style.CategoryEditContainer} ${style.Card}`}>
      <form onSubmit={handleSubmit}>
        <div className={style.CategoryEditForm}>
          <div className={style.InputContainer}>
            <h2>{action}</h2>
            <label className={style.Label}>
              Nombre:
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className={style.Input}
              />
            </label>
            <label className={style.Label}>
              Imagen:
              <input
                type="text"
                name="image"
                value={data.image}
                onChange={handleChange}
                className={style.Input}
              />
            </label>
          </div>

          {/* Puedes agregar más campos según sea necesario */}
          <div className={style.ImageContainer}>
            {data.image ? (
              <img
                src={data.image}
                alt="Vista previa"
                className={style.ImagePreview}
              />
            ) : (
              <div className={style.ImagePreview}></div>
            )}
            <button type="submit" className={style.Button}>
              {action}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryViewer;
