import React from "react";
import { FaRocket, FaLightbulb, FaUsers, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import banner1 from '../../../assets/banner1.json'
import banner2 from '../../../assets/banner2.json'

const Banner = () => {
  return (
    <div className="rounded-3xl bg-[#ebf0ef] text-[#003a43] relative py-20 px-6 text-center overflow-hidden dark:bg-[#1f1f1f] dark:text-white">
      <div className="container mx-auto ">
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-30 animate-pulse blur-lg"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-300 rounded-full opacity-30 animate-pulse blur-lg"></div>
      <div className="absolute bottom-50 right-30 w-40 h-40 bg-orange-300 rounded-full opacity-30 animate-pulse blur-lg"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-5xl font-semibold tracking-wide mb-6">
          Empowering the Next Generation of Tech Innovators 🚀
        </h1>
        <p className="text-lg font-extralight mb-8 leading-relaxed">
          Welcome to <span className="font-bold">Tech Hunt Point</span>, your
          gateway to discovering, sharing, and elevating cutting-edge tech
          products. Whether it's AI tools, mobile apps, or games, we’ve got you
          covered!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <FaRocket className="text-5xl text-[#ff8d6e] mb-3" />
            <p className="text-lg font-semibold">Unleash Innovation</p>
            <span className="text-md ">
              Explore tech tools reshaping the future.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FaLightbulb className="text-5xl text-[#ff8d6e] mb-3" />
            <p className="text-lg font-semibold">Showcase Your Ideas</p>
            <span className="text-md ">
              Submit your creations and gain visibility.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FaUsers className="text-5xl text-[#ff8d6e] mb-3" />
            <p className="text-lg font-semibold">Engage & Contribute</p>
            <span className="text-md ">
              Vote, review, and support your favorites.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FaStar className="text-5xl text-[#ff8d6e] mb-3" />
            <p className="text-lg font-semibold">Unlock Premium Features</p>
            <span className="text-md ">
              Access exclusive benefits with paid plans.
            </span>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Link to="/products">
            <button className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-8 py-5 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg">
              Explore Products
            </button>
          </Link>
          <Link to="/products">
            <button className="bg-transparent border-2 border-[#003a43] dark:border-white px-8 py-5 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300">
              Join the Community
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex justify-between -mb-40">
      <Lottie
          animationData={banner2} 
          style={{ height: "300px", width: "350px" }}
        />
        <Lottie
        animationData={banner1} 
        style={{ height: "300px", width: "300px" }}
      />
      </div>
        </div>
        
     
    </div>
  );
};

export default Banner;
