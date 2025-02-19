import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

const ProductReview = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const { data } = await axiosSecure(
            `/products`,
          );
          return data;
        },
      });
      const handleViewDetails = (id) => {
        navigate(`/products/${id}`);
      };

      const handleAction = async (id, action) => {
        try {
          await axiosSecure.patch(`/products/${id}`, { status: action });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Product ${action} successfully!`,
          });
          refetch(); // Refetch the product list after an action
        } catch (err) {
          console.error(`Failed to ${action} product:`, err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Failed to ${action} product. Please try again.`,
          });
        }
      };

      if (isLoading) return <LoadingSpinner />;
    
    
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-[#003a43] dark:bg-[#303030] dark:text-white">
    <h1 className="text-2xl font-bold mb-6 text-center">Review Pending Submissions</h1>
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 p-2">Product Name</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="border border-gray-300 p-2">{product.name}</td>
            <td className="border border-gray-300 p-2 space-x-2 text-center">
              <button
                onClick={() => handleViewDetails(product._id)}
                className="bg-transparent border-2 border-[#003a43] px-4 py-2 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300"
                    >
                View Details
              </button>
              <button
                onClick={() => handleAction(product._id, "Featured")}
                className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-4 py-2 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
                    >
                Make Featured
              </button>
              <button
                onClick={() => handleAction(product._id, "Accepted")}
                disabled={product.status === "Accepted"}
                className="bg-[#003a43] text-white border-2 hover:border-[#003a43] px-4 py-2 rounded-full font-semibold hover:bg-[#9fb4b7] transition duration-300 shadow-lg"
                >
                Accept
              </button>
              <button
  onClick={() => handleAction(product._id, "Rejected")}
  disabled={product.status === "Rejected"}
  className="border-2 hover:border-red-500 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300 shadow-lg text-red-700"
>
  Reject
</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default ProductReview;
