import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import style from "./CategoryEdit.module.css";
import Toaster from "../../components/common/toast/Toast";
import CategoryViewer from "../../components/categories/CategoryViewer";

function CategoryEdit() {
  let { state } = useLocation();
  console.log(state);
  const [category, setCategory] = useState({
    id: state.id,
    name: state.name,
    image: state.image,
  });

  const handleUpdateCategory = async () => {
    try {
      await api.put(`/categories/${category.id}`, category);
      await Toaster("success", "La actualización fue un éxito.");
    } catch (error) {
      await Toaster("error", "No se actualizó correctamente.");
    }
  };

  return (
    <div className={`${style.CategoryEditContainer} ${style.Card}`}>
      <CategoryViewer
        data={category}
        setData={setCategory}
        onSubmit={handleUpdateCategory}
        action="Edit Category"
      />
    </div>
  );
}

export default CategoryEdit;
