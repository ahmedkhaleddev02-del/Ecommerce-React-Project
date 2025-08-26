import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  const [Category, setCategory] = useState([]);
  function getAllCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`, {
        params: {},
      })
      .then((res) => {
        // console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {
        <div className="row">
          {Category.map((productaya) => (
            <div key={productaya._id} className="w-1/5">
              <Link
                to={`/categoriesdetails/${productaya._id}/${productaya.name}`}
              >
                <div className="product p-4 my-2 cursor-pointer">
                  <img
                    src={productaya.image}
                    className="w-full h-[200px] object-cover"
                    alt=""
                  />
                  <h3 className=" text-emerald-600">{productaya.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      }
    </>
  );
}
