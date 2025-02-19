import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../../pages/Products/ProductCard";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const TrendingProducts = () => {
   const {
    data: trendingProducts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error fetching trending products: {error.message}
      </div>
    );
  }
  // Sort products based on vote count
  const sortedProducts = trendingProducts.sort((a, b) => b.votes - a.votes);
  return (
    <div className="container pb-20 px-6 text-[#003a43] dark:text-white mx-auto">
<div className="mb-6 space-y-3">
      <h1 className="text-5xl font-semibold tracking-wide ">What’s Hot</h1>
      <p className="text-xl">Top-voted products by our community.</p>
      </div>
      <div className="grid grid-cols-1  gap-6">
        {sortedProducts.slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product} refetch={refetch} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to="/products">
          <button className="bg-transparent border-2 border-[#003a43] dark:border-white px-8 py-5 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300">
            Show All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;
