import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import ProductCard from "../../../pages/Products/ProductCard";

const FeaturedProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/products?status=Featured`
      );
      return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-20 px-6 text-[#003a43]">
      <div className=" mb-6 space-y-3">
        <h1 className="text-5xl font-semibold tracking-wide">Featured Gems</h1>
        <p className="text-xl">Spotlighting the latest and greatest.</p>
      </div>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No featured products available.</p>
      )}
    </div>
  );
};

export default FeaturedProducts;
