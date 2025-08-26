import React, { useEffect, useState } from "react";
import style from "./MainHomePageSlider.module.css";
import axios from "axios";
import SliederImage1 from "../../assets/slider-image-1.jpeg";
import SliederImage2 from "../../assets/slider-image-2.jpeg";
import SliederImage3 from "../../assets/slider-image-3.jpeg";
import SliederImage4 from "../../assets/grocery-banner.png";
import SliederImage5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainHomePageSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>
      <div className="row my-5">
        <div className="w-3/4">
          <Slider {...settings}>
            <img
              src={SliederImage1}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={SliederImage5}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={SliederImage3}
              className="w-full h-[400px] object-cover"
              alt=""
            />
          </Slider>
        </div>
        <div className="w-1/4">
          <img
            src={SliederImage2}
            className="w-full h-[200px] object-cover"
            alt=""
          />
          <img
            src={SliederImage3}
            className="w-full h-[200px] object-cover"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
