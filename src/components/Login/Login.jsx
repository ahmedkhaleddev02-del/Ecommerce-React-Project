import  { useContext, useState } from "react";
import axios from "axios"; /* for calling api */
import {
  useFormik
} from "formik"; /* formik is a library to make the methods of form */
import {
  Link,
  useNavigate,
} from "react-router-dom"; /* for programming routing  */
import * as Yup from "yup"; /* Yup is an object has all properties and method in yup  */
import { userContext } from "../Context/UserContext";












export default function Login() {
  let { setUserLogin } = useContext(userContext);

  let navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{6,10}$/, "invalid Password")
      .required(),
  });

  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setIsLoading(false);
        // console.log(res.data.message);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        // console.log(res.response.data.message);
        setApiError(res.response.data.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema /*  equals to ==> validationSchema: validationSchema, */,
    onSubmit: handleLogin,
  });

  return (
    <>
      {apiError ? (
        <div className="bg-red-600 p-3 w-1/2 mx-auto font-bold rounded-lg text-xl text-slate-200  ">
          {apiError}
        </div>
      ) : null}

      <div className="my-10">
        <h2 className="font-bold text-2xl text-emerald-600">Login Now</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
          {/* email input  */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div className="p-1 mb-4 text-md text-red-700" role="alert">
              {formik.errors.email}
            </div>
          ) : null}

          {/* Password input  */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password
            </label>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div className="p-1 mb-4 text-md text-red-700" role="alert">
              {formik.errors.password}
            </div>
          ) : null}

          <div className="flex gap-16 items-center">
            <button
              type="submit"
              className="text-white cursor-pointer bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-600 dark:focus:ring-emerald-600"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <Link to={"/Register"}>
              <span className="text-blue-600 underline">Register Now !</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
