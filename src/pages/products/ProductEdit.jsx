import { useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import api from "../../api/axios";
import Toaster from "../../components/common/toast/Toast";
import ProductViewer from "../../components/products/ProductViewer";

const ProductEdit = () => {
  let { state } = useLocation();
  const loader = useLoaderData();
  const [formData, setFormData] = useState({
    id: state.id,
    title: state.title,
    price: state.price,
    description: state.description,
    categoryId: state.category.id,
  });

  const handleSubmit = async () => {
    try {
      await api.put(`/products/${state.id}`, JSON.stringify(formData));
      await Toaster("success", "La actualizacion fue un éxito.");
    } catch (error) {
      await Toaster("error", "No se actualizo correctamente");
    }
  };

  return (
    <ProductViewer
      data={formData}
      setData={setFormData}
      onSubmit={handleSubmit}
      loader={loader}
      action="Actualizar"
    />
  );
};
export default ProductEdit;
