import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = async (type, msg) => {
  const toastFunction = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
  }[type];

  if (!toastFunction) {
    console.error(`Tipo de tostada no válido: ${type}`);
    return;
  }

  try {
    await new Promise((resolve) => {
      toastFunction(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: resolve,
      });
    });
  } catch (error) {
    console.error(`Error al mostrar la tostada: ${error}`);
  }
};

export default Toaster;
