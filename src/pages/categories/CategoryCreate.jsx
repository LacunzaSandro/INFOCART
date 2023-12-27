import { useState } from "react";

import api from "../../api/axios";
import style from "./CategoryEdit.module.css";
import Toaster from "../../components/common/toast/Toast";
import CategoryViewer from "../../components/categories/CategoryViewer";

function CategoryCreate() {
  const [category, setCategory] = useState({
    id: "",
    name: "",
    image: "",
  });

  const handleCreateCategory = async () => {
    try {
      await api.post(`/categories`, category);
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
        onSubmit={handleCreateCategory}
        action="Create Category"
      />
    </div>
  );
}

export default CategoryCreate;
