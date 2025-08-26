import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../Context/CartContext";
import useProducts from "../../Hooks/useProducts";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id, categoryName } = useParams();
  const [ProductDetails, setProductDetails] = useState(null);
  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [CurrentId, setCurrentId] = useState(0);
  function getProduct(idParameter) {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products/${idParameter}
`
      )
      .then((res) => {
        // console.log(res.data.data);
        setProductDetails(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // console.log(res.data.data);
        let related = res.data.data.filter((chosenProduct) => {
          return chosenProduct.category.name == categoryName;
        });
        // console.log(related);
        setRelatedProducts(related);
      })
      .catch(() => {});
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  useEffect(() => {
    getProduct(id);
    getRelatedProducts();
  }, [id, categoryName]);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setLoading(false);
      return toast.success(response.data.message);
    } else {
      setLoading(false);
      return toast.error(response.data.message);
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
      <div className="row items-center">
        <div className="w-1/4">
          {ProductDetails?.images?.length > 1 ? (
            <Slider {...settings}>
              {ProductDetails.images.map((sourcaya) => (
                <img src={sourcaya} />
              ))}
            </Slider>
          ) : (
            <img src={ProductDetails?.imageCover} alt="main product" />
          )}
          {/* <img src={ProductDetails?.imageCover} className="w-full" /> */}
          {/* optional chaning coz error of can't read property of null is setProductDetails */}
        </div>
        <div className="w-3/4 p-4 text-left">
          <h3 className="font-semibold capitalize text-2xl">
            {ProductDetails?.title}
          </h3>
          <h4 className="text-gray-600 my-4">{ProductDetails?.description}</h4>
          <h4 className="my-5">{ProductDetails?.category.name}</h4>
          <div className="flex justify-between p-3 my-5">
            <span>{ProductDetails?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400"></i>
              {ProductDetails?.ratingsAverage}
            </span>
          </div>
          <button
            onClick={() => addToCart(ProductDetails.id)}
            className="btn cursor-pointer bg-emerald-600 py-2 px-4 w-full text-slate-200 rounded-lg"
          >
            {Loading && CurrentId == ProductDetails.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>

      {/* display related products */}
      {RelatedProducts.length > 0 ? (
        <div className="row">
          {RelatedProducts.map((productaya) => (
            <div key={productaya.id} className="w-1/6">
              <div className="product p-2 my-1">
                <Link
                  to={`/productdetails/${productaya.id}/${productaya.category.name}`}
                >
                  <img src={productaya.imageCover} alt="" />

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
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
}
