import React from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-products/${user?.email}`);
      return data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/products/${id}`);
          refetch();
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire(
            "Error!",
            "After Accepted Failed to delete the product.",
            "error"
          );
        }
      }
    });
  };

  if (isLoading || isError) return <LoadingSpinner />;

  if (products.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-8 bg-gray-50 min-h-screen text-[#003a43] ">
      <Helmet>
        <title>My Products | Dashboard</title>
      </Helmet>
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-3xl font-semibold ">
          Your Contributions
        </h1>
        <p className="text-xl">Manage the products you’ve submitted.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Votes</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="px-3 py-2 border">{product.name}</td>
                <td className="px-3 py-2 border">{product.votes}</td>
                <td className="px-3 py-2 border">{product.status}</td>
                <td className="px-3 py-2 border space-x-2 space-y-2">
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="bg-transparent border-2 border-[#003a43] px-4 py-2 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-4 py-2 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
