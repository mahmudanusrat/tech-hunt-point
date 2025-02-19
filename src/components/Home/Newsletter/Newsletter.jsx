import React from 'react';

const Newsletter = () => {
  return (
    <div className=" text-[#003a43] dark:bg-[#303030] dark:text-white py-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-semibold tracking-wide mb-6">
          Subscribe to our Newsletter
        </h1>
        <p className="text-lg mb-8">
          Stay updated with the latest news and exclusive offers.
        </p>
        <form className="flex flex-col md:flex-row justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 w-full md:w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8d6e] mb-4 md:mb-0 md:mr-4"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#ff8d6e] text-white rounded-md hover:bg-[#ffb19c] transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
