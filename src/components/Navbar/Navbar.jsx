import  { useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext";




export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(userContext);

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className=" border-gray-200 bg-slate-200 fixed top-0 right-0 left-0 z-50">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="leftSideNavbar flex items-center gap-3">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8 w-[110px]" />
            </Link>

            {userLogin != null ? (
              <ul className="flex gap-3">
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="cart">Cart</Link>
                </li>
                <li>
                  <Link to="products">Products</Link>
                </li>
                <li>
                  <Link to="categories">Catygories</Link>
                </li>
                <li>
                  <Link to="brands">Brands</Link>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="icons flex gap-3">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-tiktok"></i>
              <i className="fab fa-youtube"></i>
            </div>
            {userLogin != null ? (
              <span
                onClick={() => {
                  signOut();
                }}
                className="text-sm cursor-pointer "
              >
                Sign Out
              </span>
            ) : (
              <div className="links flex gap-2">
                <Link to="login" className="text-sm ">
                  Login
                </Link>
                <Link to="register" className="text-sm ">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
