import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainHomePageSlider from "../MainHomePageSlider/MainHomePageSlider";

export default function Home() {
  return (
    <>
      <MainHomePageSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
