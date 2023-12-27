// ProductFilter.jsx
import { useState } from "react";
import style from "./ProductFilter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const ProductFilter = ({ products, onFilterChange }) => {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");

  const handleFilterChange = () => {
    // eslint-disable-next-line react/prop-types
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        product.category.name
          .toLowerCase()
          .includes(filterCategory.toLowerCase()) &&
        (!filterPriceMin || product.price >= parseFloat(filterPriceMin)) &&
        (!filterPriceMax || product.price <= parseFloat(filterPriceMax))
    );
    onFilterChange(filteredProducts);
  };
  const clearAllFilters = () => {
    setFilterTitle("");
    setFilterCategory("");
    setFilterPriceMin("");
    setFilterPriceMax("");
    onFilterChange(products);
  };

  return (
    <div className={style.productFilterContainer}>
      <div className={style.productFilter}>
        <div className={style.filterInput}>
          <label htmlFor="filterTitle">Filtrar por título:</label>
          <input
            type="text"
            id="filterTitle"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
        </div>
        <div className={style.filterInput}>
          <label htmlFor="filterCategory">Filtrar por categoría:</label>
          <input
            type="text"
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </div>
        <div className={style.filterInput}>
          <label htmlFor="filterPriceMin">Precio mínimo:</label>
          <input
            type="number"
            id="filterPriceMin"
            value={filterPriceMin}
            onChange={(e) => setFilterPriceMin(e.target.value)}
          />
        </div>
        <div className={style.filterInput}>
          <label htmlFor="filterPriceMax">Precio máximo:</label>
          <input
            type="number"
            id="filterPriceMax"
            value={filterPriceMax}
            onChange={(e) => setFilterPriceMax(e.target.value)}
          />
        </div>
        <div className={style.buttonContainer}>
          <div className={style.buttonFiltro}>
            <button onClick={handleFilterChange}>Aplicar Filtros</button>
          </div>
          <div className={style.buttonDelete}>
            <button onClick={clearAllFilters} title="Borrar Filtros">
              <FontAwesomeIcon
                icon={faTrash}
                beat
                style={{ color: "#cacdd3" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
