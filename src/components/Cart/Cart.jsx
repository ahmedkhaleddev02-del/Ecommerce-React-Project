import { useContext, useEffect, useState } from "react";

import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [CartDetails, setCartDetails] = useState(null);

  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    clearCart,
  } = useContext(CartContext);

  async function getCart() {
    let response = await getLoggedUserCart();
    // console.log(response.data.data);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
    }
  }

  async function updateProduct(id, count) {
    let response = await updateCartProductQuantity(id, count);
    // console.log(response.data.data);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Updated Successfuly");
    } else {
      toast.error("Can not Update");
    }
  }

  async function deleteSpecificItem(id) {
    let response = await deleteCartItem(id);
    // console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Removed Successfuly");
    } else {
      toast.error("Can not remove");
    }
  }

  // clear cart
  async function deleteAllCart() {
    let response = await clearCart();
    // console.log(response);
    if (response.data.message == "success") {
      setCartDetails(null);
      toast.success("Product Removed Successfuly");
    } else {
      toast.error("Can not remove");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {CartDetails?.products.length > 0 ? (
        <>
          <h2 className="capitalize text-3xl p-5 text-emerald-600 font-bold">
            {" "}
            total price is {CartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {CartDetails?.products.map((productaya) => (
                  <tr
                    key={productaya.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={productaya.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {productaya.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(
                              productaya.product.id,
                              productaya.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{productaya.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(
                              productaya.product.id,
                              productaya.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {productaya.price * productaya.count}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() =>
                          deleteSpecificItem(productaya.product.id)
                        }
                        className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/checkout">
              <button className=" cursor-pointer my-2 w-[100%] text-xl text-slate-200 font-bold bg-emerald-600 py-2 rounded-xl">
                Checkout
              </button>
            </Link>
            <button
              onClick={() => deleteAllCart()}
              className=" cursor-pointer my-2 w-[100%] text-xl text-slate-200 font-bold bg-red-600 py-2 rounded-xl"
            >
              Clear
            </button>
          </div>
        </>
      ) : (
        <h2 className="capitalize text-3xl p-5 text-emerald-600 font-bold">
          {" "}
          No Items To Show{" "}
        </h2>
      )}
    </>
  );
}
