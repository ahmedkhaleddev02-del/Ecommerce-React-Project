// import axios from "axios";
// import { useEffect, useState } from "react";
// import { createContext, useContext } from "react";

// export let CartContext = createContext();

// export default function CartContextProvider(props) {
//   let headers = { token: localStorage.getItem("userToken") }; // used in all cart Methods

//   const [CartId, setCartId] = useState(null);

//   function addProductToCart(productIdParameter) {
//     return axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/cart`,
//         {
//           productId: productIdParameter,
//         },
//         {
//           headers,
//         }
//       )
//       .then((res) => res)
//       .catch((err) => err);
//   }

//   function getLoggedUserCart() {
//     return axios
//       .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
//       .then((res) => {
//         // console.log(res.data.data._id);
//         setCartId(res.data.data._id);
//         return res;
//       })
//       .catch((err) => err);
//   }

//   function updateCartProductQuantity(productIdParameter, newCountParameter) {
//     return axios
//       .put(
//         `https://ecommerce.routemisr.com/api/v1/cart/${productIdParameter}`,
//         { count: newCountParameter },
//         { headers }
//       )
//       .then((res) => res)
//       .catch((err) => err);
//   }

//   function deleteCartItem(productIdParameter) {
//     return axios
//       .delete(
//         `https://ecommerce.routemisr.com/api/v1/cart/${productIdParameter}`,
//         { headers }
//       )
//       .then((res) => res)
//       .catch((err) => err);
//   }

//   function checkout(cartId, url, formData) {
//     return axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
//         { shippingAddress: formData },
//         { headers }
//       )
//       .then((res) => res)
//       .catch((err) => err);
//   }

//   function clearCart() {
//     return axios
//       .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
//       .then((res) => res)
//       .catch((err) => err);
//   }

//   useEffect(() => {
//     getLoggedUserCart();
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         addProductToCart,
//         getLoggedUserCart,
//         updateCartProductQuantity,
//         deleteCartItem,
//         checkout,
//         CartId,
//         clearCart,
//       }}
//     >
//       {props.children}
//     </CartContext.Provider>
//   );
// }


import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [CartId, setCartId] = useState(null);

  // function to always get the latest token
  function getHeaders() {
    return { token: localStorage.getItem("userToken") };
  }

  function addProductToCart(productIdParameter) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productIdParameter },
        { headers: getHeaders() }
      )
      .then((res) => res)
      .catch((err) => err.response); // important
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() })
      .then((res) => {
        setCartId(res.data.data._id);
        return res;
      })
      .catch((err) => err.response);
  }

  function updateCartProductQuantity(productIdParameter, newCountParameter) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productIdParameter}`,
        { count: newCountParameter },
        { headers: getHeaders() }
      )
      .then((res) => res)
      .catch((err) => err.response);
  }

  function deleteCartItem(productIdParameter) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productIdParameter}`,
        { headers: getHeaders() }
      )
      .then((res) => res)
      .catch((err) => err.response);
  }

  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers: getHeaders() }
      )
      .then((res) => res)
      .catch((err) => err.response);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() })
      .then((res) => res)
      .catch((err) => err.response);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProductQuantity,
        deleteCartItem,
        checkout,
        CartId,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
