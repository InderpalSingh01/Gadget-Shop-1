import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./common/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Aboutus from "./pages/Aboutus";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./Common/authentication/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/aboutus",
          element: <Aboutus />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/product/:id",
              element: <ProductDetail />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 2500 },
          error: { duration: 3000 },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;