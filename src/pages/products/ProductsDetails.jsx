import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { reducer, actions, initialState } from "../../api/reducer.js";
import Product from "../../api/products";
import Error from "../../components/general/Error.jsx";
import Loader from "../../components/general/Loader.jsx";
import ImageSlider from "../../components/imageSlider/imageSlider.jsx";
import styles from "./ProductsDetails.module.css";

// eslint-disable-next-line react/prop-types
function ProductsDetails() {
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (loading || data.length > 0) return;

      try {
        dispatch(actions.loadingStart());
        const json = await Product.getProduct(id);
        dispatch(actions.setData(json));
      } catch (error) {
        dispatch(actions.setError(error));
      } finally {
        dispatch(actions.loadingStop());
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loader size={50} />;
  } else if (error) {
    return <Error message="Failed to load products" />;
  } else {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          {data.images && data.images.length > 0 ? (
            <ImageSlider images={data.images} />
          ) : (
            <p className={styles.noImages}>No hay imágenes disponibles.</p>
          )}
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Product Details</h2>
          <p className={styles.productInfo}>
            <strong>Name:</strong> {data.title}
          </p>
          <p className={styles.productInfo}>
            <strong>Product ID:</strong> {id}
          </p>
          <p className={styles.productInfo}>
            <strong>Price: $</strong>
            {data.price}
          </p>
          <p className={styles.productInfo}>
            <strong>Description: </strong>
            {data.description}
          </p>
          <p className={styles.productInfo}>
            <strong>Category: </strong>
            {data.category?.name || "Sin categoría"}
          </p>
        </div>
      </div>
    );
  }
}

export default ProductsDetails;
