import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      {/* <Navbar />
      <div className="container mx-auto py-10">
        <Outlet />
      </div>
      <Footer /> */}

      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* ده المحتوى اللي بيتمدّد وياخد المساحة الفاضية */}
        <div className="container mx-auto py-10 flex-grow">
          <Outlet />
        </div>


        <Footer />
      </div>
    </>
  );
}
