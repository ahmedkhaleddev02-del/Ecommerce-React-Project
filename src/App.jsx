// import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Notfound from "./components/Notfound/Notfound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Brands from "./components/Brands/Brands";
import UserContextProvider from "./components/Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./components/Context/CartContext";
import { Toaster } from "react-hot-toast";
import SpecificCategory from "./components/SpecificCategory/SpecificCategory";
import SpicificBrand from "./components/SpicificBrand/SpicificBrand";
import Checkout from "./components/Checkout/Checkout";
import AllOrders from "./components/AllOrders/AllOrders";




let query = new QueryClient();

function App() {
  // const [count, setCount] = useState(0);

  let x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:categoryName",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "branddetails/:id/:brandname",
          element: (
            <ProtectedRoute>
              <SpicificBrand />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "categoriesdetails/:id/:categoryname",
          element: (
            <ProtectedRoute>
              <SpecificCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <RouterProvider router={x}></RouterProvider>
          <Toaster />
        </CartContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
