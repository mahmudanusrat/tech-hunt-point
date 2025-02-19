import React from "react";
import { FaSearch, FaUsers, FaLock, FaRocket } from "react-icons/fa"; // Importing icons

const UserReviews = () => (
  <div className="container py-20 px-6 text-[#003a43] mx-auto">
    <div className="mb-6 space-y-3 text-center dark:text-white">
      <h1 className="text-5xl font-semibold tracking-wide">Why Tech Hunt Point?</h1>
      <p className="text-xl">
        Discover, share, and interact with innovative tech products in a community-driven platform designed for tech enthusiasts.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="flex flex-col items-center space-y-4 bg-[#c5d6d7] p-8 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg text-center">
        <FaSearch className="w-12 h-12 text-[#003a43]" />
        <h3 className="text-xl font-semibold">Comprehensive Product Discovery</h3>
        <p className="text-md text-gray-600">Explore a wide range of tech products, from AI tools to mobile apps, all in one place.</p>
      </div>
      <div className="flex flex-col items-center space-y-4 bg-[#e0f7fa] p-8 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg text-center">
        <FaUsers className="w-12 h-12 text-[#003a43]" />
        <h3 className="text-xl font-semibold">Community Engagement</h3>
        <p className="text-md text-gray-600">Share your favorite products, upvote, and contribute to discussions with fellow tech enthusiasts.</p>
      </div>
      <div className="flex flex-col items-center space-y-4 bg-[#f1f8e9] p-8 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg text-center">
        <FaLock className="w-12 h-12 text-[#003a43]" />
        <h3 className="text-xl font-semibold">Secure and User-Friendly</h3>
        <p className="text-md text-gray-600">Enjoy a seamless experience with secure login options and an intuitive interface.</p>
      </div>
      <div className="flex flex-col items-center space-y-4 bg-[#fce4ec] p-8 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg text-center">
        <FaRocket className="w-12 h-12 text-[#003a43]" />
        <h3 className="text-xl font-semibold">Innovative Features</h3>
        <p className="text-md text-gray-600">Access cutting-edge tools and resources to stay ahead in the tech industry.</p>
      </div>
    </div>
  </div>
);

export default UserReviews;
