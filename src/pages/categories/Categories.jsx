import { useReducer, useEffect, useCallback, useState } from "react";
import { reducer, actions, initialState } from "../../api/reducer.js";
import Product from "../../api/products.js";
import ProductCard from "../../components/products/ProductCard.jsx";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.jsx";
import Loader from "../../components/general/Loader.jsx";
import api from "../../api/axios";
import style from "./Categories.module.css";
import Modal from "../../components/common/Modal/ModalBase.jsx";

function Categories() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = state;
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    if (loading || data.length > 0) return;

    try {
      dispatch(actions.loadingStart());
      const json = await Product.getList();
      dispatch(actions.setData(json));
      setFilteredProducts(json); // Actualizar filteredProducts aquí
    } catch (_error) {
      dispatch(actions.setError(_error));
    } finally {
      dispatch(actions.loadingStop());
    }
  }, [loading, data]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleFilterChange = (selectedCategories) => {
    if (!selectedCategories) {
      return;
    }
    // Realizar la lógica de filtrado y actualizar el estado según sea necesario
    const filteredProducts =
      selectedCategories.length === 0
        ? data
        : data.filter((product) =>
            selectedCategories.some(
              (selectedCategory) => selectedCategory.id === product.category.id
            )
          );

    setFilteredProducts(filteredProducts);
  };
  const handleOkAction = async (id) => {
    try {
      setModalOpen(false);
      await api.delete(`/products/${id}`, {});
      const updatedProducts = filteredProducts.filter(
        (product) => product.id !== id
      );
      setFilteredProducts(updatedProducts);
    } catch (err) {
      setModalOpen(false);
      console.log("It not look well:" + err);
    }
  };
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = (id) => {
    setId(id);
    setModalOpen(true);
  };
  if (loading) {
    return <Loader size={50} />;
  } else {
    return (
      <div className={style.productsContainer}>
        <div className={style.productFilterContainer}>
          <CategoryMenu onFilterChange={handleFilterChange} />
        </div>

        <div className={style.products}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleOpenModal}
            />
          ))}
          <Modal
            isOpen={isModalOpen}
            onCancel={handleCloseModal}
            onOk={() => handleOkAction(id)}
          />
        </div>
      </div>
    );
  }
}

export default Categories;
