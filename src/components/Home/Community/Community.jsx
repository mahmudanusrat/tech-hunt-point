import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import hands from '../../../assets/hands.json';

const Community = () => {
  return (
    <div className="text-[#003a43] bg-[#c5d6d7] dark:bg-[#303030] dark:text-white">
      <div className="container mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 space-y-3 md:w-1/2">
            <h1 className="text-5xl font-semibold tracking-wide">
              Join Our Community
            </h1>
            <p className="text-xl">
              Engage with fellow tech enthusiasts, share ideas, and discuss
              trending products.
            </p>
            <div>
              <Link to="/products">
                <button className="bg-[#ff8d6e] border-2 hover:border-[#ff8d6e] px-4 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <Lottie
              animationData={hands}
              style={{ height: "350px", width: "350px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
