import { useEffect, useState } from "react";
import style from "../../pages/products/ProductEdit.module.css";

// eslint-disable-next-line react/prop-types
const ProductViewer = ({ data, setData, onSubmit, action, loader }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setData((prevData) => ({
      ...prevData,
      categoryId: categoryId,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
    setData({
      id: "",
      title: "",
      price: "",
      description: "",
      categoryId: "",
      images: [
        "https://cdn.pixabay.com/photo/2017/08/05/00/12/girl-2581913_960_720.jpg",
      ],
    });
  };

  useEffect(() => {}, [data]);

  return (
    <form onSubmit={handleSubmit} className={style.formUpdate}>
      <label className={style.label}>
        Título:
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Precio:
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Descripción:
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className={style.textarea}
        />
      </label>
      <label htmlFor="category">Select a category:</label>
      <select
        id="category"
        value={data.categoryId}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {loader.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <p>You selected: {selectedCategory}</p>
      <button type="submit" className={style.button}>
        {action}
      </button>
    </form>
  );
};
export default ProductViewer;
