import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const [Categories, setCategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategories(res.data.data);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="capitalize my-3 text-left font-semibold">
        show popular categories
      </h2>
      <Slider {...settings}>
        {Categories.map((categoraya) => {
          return (
            <div key={categoraya.id} className="">
              <img
                src={categoraya.image}
                className="w-full h-[200px] object-cover"
                alt=""
              />
              <h3>{categoraya.name}</h3>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
