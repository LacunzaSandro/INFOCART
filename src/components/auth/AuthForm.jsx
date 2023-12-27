import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import styles from "./AuthForm.module.css";
import Toaster from "../common/toast/Toast";
import { useAuthContext } from "../../context/AuthContext";
// eslint-disable-next-line react/prop-types
const AuthForm = ({ type }) => {
  const { login } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  console.log(from)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://picsum.photos/800",
  });
  const configForProfile = (token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "register") {
        await api.post("/users", JSON.stringify(formData));
        await Toaster("success", "El registro se realizo correctamente.");
      } else if (type === "login") {
        let response = await api.post("/auth/login", JSON.stringify(formData));
        const accessToken = response?.data?.access_token;
        const refreshToken = response?.data?.refresh_token;

        //profile
        response = await api.get(
          "/auth/profile",
          configForProfile(accessToken)
        );
        login({
          token: accessToken,
          refresh_token: refreshToken,
          role: response?.data?.role,
          user: response?.data,
        });

        navigate(from, { replace: true });
        await Toaster("success", "El login se realizo correctamente.");
      }

      // Puedes agregar lógica adicional después del envío del formulario
    } catch (error) {
      await Toaster("error", "La acción no se completo correctamente.");
    }
  };

  return (
    <div className={styles.ContainerAuth}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        {type === "register" && (
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
          </div>
        )}

        <div className={styles.inputContainer}>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        </div>

        {type === "register" && (
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Avatar (opcional):
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
          </div>
        )}

        <button type="submit" className={styles.button}>
          {type === "register" ? "Registrarse" : "Iniciar Sesión"}
        </button>

        <p>
          {type === "register"
            ? "¿Ya tienes una cuenta? "
            : "¿No tienes una cuenta? "}
          <Link to={type === "register" ? "/login" : "/register"}>
            {type === "register" ? "Inicia sesión" : "Regístrate"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
