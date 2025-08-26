import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Brands() {




  const [AllBrands, setAllBrands] = useState(null);

  function getAllBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        // console.log(res.data.data);
        setAllBrands(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }





  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
        <div className="row">
          {AllBrands?.map((productaya) => (
            <div key={productaya._id} className="w-1/4">
              <Link
                to={`/branddetails/${productaya._id}/${productaya.name}`}
              >
                <div className="product p-4 my-2 cursor-pointer">
                  <img
                    src={productaya.image}
                    className="w-full"
                    alt=""
                  />
                  <h3 className=" text-emerald-600 font-bold text-2xl my-3">{productaya.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>    </>
  );
}
