import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

const Footer = () => {
  const date = new Date();
  return (
    <footer className={style.footer}>
      <span>
        &copy;{`${date.getFullYear()}`}
        <Link target="_blank" to={"/"}>
          Fresh Cart .
        </Link>
        All Reversed.
      </span>
    </footer>
  );
};

export default Footer;

