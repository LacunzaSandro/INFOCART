import { useReducer, useEffect, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reducer, actions, initialState } from "../../api/reducer.js";
import Loader from "../../components/general/Loader.jsx";
import Categories from "../../api/categories.js";
import style from "./CategoryMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/axios";
import Modal from "../common/Modal/ModalBase.jsx";
import Toaster from "../../components/common/toast/Toast";
import { useAuthContext } from "../../context/AuthContext.jsx";
// eslint-disable-next-line react/prop-types
const CategoryMenu = ({ onFilterChange }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = state;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [id, setId] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const { role } = useAuthContext();
  const navigate = useNavigate();

  const handleOpenModal = (e, id) => {
    e.stopPropagation();
    setId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleOkAction = async (id) => {
    try {
      setModalOpen(false);
      await api.delete(`/categories/${id}`, {});
      const updatedData = data.filter((category) => category.id !== id);
      await dispatch(actions.setData(updatedData));
      await Toaster("success", "La actualizacion fue un éxito.");
    } catch (error) {
      setModalOpen(false);
      await Toaster("success", "No se actualizo correctamente");
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const isCategorySelected = prevSelectedCategories.some(
        (selectedCategory) => selectedCategory.id === category.id
      );
      const updatedCategories = isCategorySelected
        ? prevSelectedCategories.filter(
            (selectedCategory) => selectedCategory.id !== category.id
          )
        : [...prevSelectedCategories, category];

      return updatedCategories;
    });
  };

  useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories]);

  const loadProducts = useCallback(async () => {
    if (loading || data.length > 0) return;

    try {
      dispatch(actions.loadingStart());
      const json = await Categories.getList();
      dispatch(actions.setData(json));
    } catch (_error) {
      dispatch(actions.setError(_error));
    }
    dispatch(actions.loadingStop());
  }, [loading, data]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const renderButtonAdmin = (category) => {
    if (role === "admin") {
      return (
        <>
          <Link
            to={`/category/${category.id}/edit`}
            state={category}
            className={style.EditCategoryButton}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              beat
              size="sm"
              style={{ color: "#c2c2c2", animation: "none" }}
            />
          </Link>
          <Link
            onClick={(e) => handleOpenModal(e, category.id)}
            className={style.EditCategoryButton}
          >
            <FontAwesomeIcon
              icon={faTrash}
              beat
              size="sm"
              style={{ color: "#c2c2c2", animation: "none" }}
            />
          </Link>
        </>
      );
    }
    return null; // No renderizar el botón si el rol no es "admin"
  };
  const handleAddProducto = () => {
    navigate("/category/create");
  };
  if (loading) {
    return <Loader size={50} />;
  }  else {
    return (
      <>
        {role == "admin" && (
          <button
            onClick={handleAddProducto}
            className={style.createCategory}
            title="Agregar Categoría"
          >
            +
          </button>
        )}
        <div className={style.CategoryMenu}>
          <ul>
            {data.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={
                  selectedCategories.some(
                    (selectedCategory) => selectedCategory.id === category.id
                  )
                    ? style.selected
                    : ""
                }
              >
                {category.name}
                {renderButtonAdmin(category)}
              </li>
            ))}
          </ul>
          <Modal
            isOpen={isModalOpen}
            onCancel={handleCloseModal}
            onOk={() => handleOkAction(id)}
          />
        </div>
      </>
    );
  }
};

export default CategoryMenu;
