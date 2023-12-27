import { useReducer, useEffect, useState } from "react";
import { reducer, actions, initialState } from "../../api/reducer.js";
import Product from "../../api/products";
import ProductCard from "../../components/products/ProductCard.jsx";
import ProductFilter from "../../components/products/ProductFilter.jsx";
import Loader from "../../components/general/Loader.jsx";
import api from "../../api/axios";
import style from "./Products.module.css";
import Modal from "../../components/common/Modal/ModalBase.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";
function Products() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = state;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const { role } = useAuthContext();

  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = (id) => {
    setId(id);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!data || loading) return;
    const fetchData = async () => {
      try {
        dispatch(actions.loadingStart());
        const json = await Product.getList();
        dispatch(actions.setData(json));
        setFilteredProducts(json);
      } catch (error) {
        dispatch(actions.setError(error));
      } finally {
        dispatch(actions.loadingStop());
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };
  const handleAddProducto = () => {
    navigate("/product/create");
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

  if (loading) {
    return <Loader size={50} />;
  } else {
    return (
      <div className={style.productsContainer}>
        <div className={style.productFilterContainer}>
          {role == "admin" && (
            <button
              onClick={handleAddProducto}
              className={style.createProduct}
              title="Agregar Producto"
            >
              +
            </button>
          )}
          <ProductFilter products={data} onFilterChange={handleFilterChange} />
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

export default Products;
