import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import Slider from "react-slick";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function SpecificCategory() {
  const [SpecificCategory, setSpecificCategory] = useState(null);
  const [RelatedProducts, setRelatedProducts] = useState(null);


  // states for ralted products
    const [Loading, setLoading] = useState(false);
    const [CurrentId, setCurrentId] = useState(0);


  let { id, categoryname } = useParams();

  function getSpecificCategory(idParameter) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${idParameter}`)
      .then((res) => {
        // console.log(res.data.data);
        setSpecificCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err.data.data);
      });
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (productaye) => productaye.category.name == categoryname
        );
        // console.log(related);
        setRelatedProducts(related);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  // to add product to cart 

    let { addProductToCart } = useContext(CartContext);
  

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



  useEffect(() => {
    getSpecificCategory(id);
    getAllProducts();
  }, []);

  return (
    <>
      {/* <h2>{SpecificCategory?.name}</h2> */}
      {/* Dispaly Related Products Of choosen category */}

      {RelatedProducts?.length > 0 ? (
        <div className="row">
          {RelatedProducts?.map((productaya) => (
            <div key={productaya._id} className="w-1/6">
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
        <h2 className="capitalize text-3xl p-5 text-emerald-600 font-bold">No Products, stay tuned </h2>
      )}
    </>
  );
}
