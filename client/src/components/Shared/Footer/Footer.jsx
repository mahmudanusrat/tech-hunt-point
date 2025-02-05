import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#003a43] p-2 md:p-8 ">
      <footer className="footer md:flex justify-between text-[#f8f3eb] ">
        <nav>
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-12 h-12" alt="" />
            <h2 className="text-3xl font-bold">Tech Hunt Point</h2>
          </Link>
          <p className="text-xl">
            It is a platform where users can discover and <br />
            share their tech products.
          </p>
        </nav>
        <nav className="mb-3">
          <h6 className="text-[#f8f3eb] font-semibold text-xl">Contact Us</h6>
          <p className="">1111 Bayside Drive Suite 270</p>
          <p className="">Corona Del Mar, CA 92625</p>
          <p className="">(866) 93-TEBRA (83272)</p>

          <nav className=" mt-3">
            <div className="grid grid-flow-col gap-2">
              <FaFacebookF className="text-2xl" />
              <FaInstagram className="text-2xl" />
              <FaLinkedinIn className="text-2xl" />
            </div>
          </nav>
        </nav>
      </footer>
      <footer className="footer  border-[#a2a09e] border-t mt-4">
        <aside className="grid-flow-col items-center mt-4">
          <p className="text-lg text-[#f8f3eb]">
            Copyright @2025 Tech Hunt Point.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
