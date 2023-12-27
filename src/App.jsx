import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRouter";
import PublicRoute from "./routes/PublicRoute";
// import getUsers from 'config/router/loaders/getUsers';
import { LOGIN, LOGOUT, CATEGORIES } from "./config/paths";
import AuthContextProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Footer from "./components/common/footer/Footer";
import Logout from "./pages/login/Logout";
import Products from "./pages/products/Products";
import ProductsDetails from "./pages/products/ProductsDetails";
import ProductEdit from "./pages/products/ProductEdit";
import ProductCreate from "./pages/products/ProductCreate";
import Categories from "./pages/categories/Categories";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/common/navbar/Navbar";
import NoMatch from "./pages/noMatch/NoMatch";
import "./App.css";
import CategoryEdit from "./pages/categories/CategoryEdit";
import CategoryCreate from "./pages/categories/CategoryCreate";
import { ToastContainer } from "react-toastify";
import CartView from "./pages/cart/CartView";
import getProducts from "./loader/products";
import getCategories from "./loader/categories";
import Checkout from "./pages/checkout/Checkout";
import Register from "./pages/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> {/* Navbar para rutas privadas */}
        <PrivateRoute requiredRoles={["admin"]} />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/category/:id/edit",
        exact: true,
        element: <CategoryEdit />,
      },
      {
        path: "/product/:id/edit",
        loader: getCategories,
        exact: true,
        element: <ProductEdit />,
      },
      {
        path: "/product/create",
        loader: getCategories,
        exact: true,
        element: <ProductCreate />,
      },
      {
        path: "/category/create",
        exact: true,
        element: <CategoryCreate />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <Navbar /> {/* Navbar para rutas privadas */}
        <PrivateRoute requiredRoles={["admin", "customer"]} />
        <Footer />
      </>
    ),
    children: [
      {
        path: LOGOUT,
        element: <Logout />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <PublicRoute />
        <Footer />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: CATEGORIES,
        element: <Categories />,
      },

      {
        path: "/products",
        exact: true,
        element: <Products />,
      },
      {
        path: "/product/:id",
        exact: true,
        element: <ProductsDetails />,
      },

      {
        path: "/checkout",
        exact: true,
        element: <Checkout />,
      },
      {
        path: "/cart",
        loader: getProducts,
        element: <CartView />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
