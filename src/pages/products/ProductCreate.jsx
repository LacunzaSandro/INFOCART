import { useState } from "react";
import api from "../../api/axios";
import Toaster from "../../components/common/toast/Toast";
import ProductViewer from "../../components/products/ProductViewer";
import { useLoaderData } from "react-router-dom";

const ProductEdit = () => {
  const loader = useLoaderData();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/00/12/girl-2581913_960_720.jpg",
    ],
  });

  const handleSubmit = async () => {
    try {
      await api.post("/products", JSON.stringify(formData));
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
      action="Crear"
    />
  );
};
export default ProductEdit;
