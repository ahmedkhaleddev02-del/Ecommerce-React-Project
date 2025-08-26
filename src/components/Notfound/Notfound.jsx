import React, { useEffect, useState } from "react";
import style from "./Notfound.module.css";
import axios from "axios";
import notFoundImage from "../../assets/error.svg";
export default function Notfound() {
  return (
    <div className="flex items-center justify-center ">
      <img src={notFoundImage} className=""  />
    </div>
  );
}
