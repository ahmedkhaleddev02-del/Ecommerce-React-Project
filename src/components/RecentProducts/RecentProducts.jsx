import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  // const [Products, setProducts] = useState([]);

  // we use tanstack query instead of get products function
  // function getProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
  //     setProducts(res.data.data);
  //   });
  //   // .catch((res) => {
  //   //   console.log(res.data.data);
  //   // });
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  const [Loading, setLoading] = useState(false);
  const [CurrentId, setCurrentId] = useState(0);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setLoading(false);
      return toast.success(response.data.message);
    } else {
      setLoading(false);
      return toast.error(response?.data?.message ||'You must be Logged in to add to cart');
    }
  }

  let { data, isError, error, isLoading } = useProducts(); //==> custom hook for preventing repetition of code used in RecentProducts & Products

  let { addProductToCart } = useContext(CartContext);

  if (isError) {
    return <h3>{error.message}</h3>;
  }
  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {
        <div className="row">
          {data.map((productaya) => (
            <div key={productaya.id} className="w-1/6">
              <div className="product p-2 my-1">
                <Link
                  to={`productdetails/${productaya.id}/${productaya.category.name}`}
                >
                  <img src={productaya.imageCover} className="w-full" alt="" />
                  <h3 className=" text-emerald-600">
                    {productaya.category.name}
                  </h3>
                  <h3 className="mb-3 font-bold">
                    {productaya.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{productaya.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {productaya.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(productaya.id)}
                  className="btn cursor-pointer bg-emerald-600 py-2 px-4 w-full text-slate-200 rounded-lg"
                >
                  {Loading && CurrentId == productaya.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}
