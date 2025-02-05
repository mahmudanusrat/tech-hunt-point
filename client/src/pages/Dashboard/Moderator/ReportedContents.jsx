import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReportedContents = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: reports = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/reported`);
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
  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-4 text-red-500">
        Error loading reported products.
      </div>
    );

  return (
    <div className="container mx-auto p-4 text-[#003a43]">
      <h1 className="text-3xl font-bold mb-6 text-center ">
        Review Reported Products
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  No reported products found
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  >
                  <td className="border border-gray-300 p-2">
                    {report.name}
                  </td>
                  <td className="border border-gray-300 p-2 space-x-2 text-center">
                    <button
                      onClick={() => navigate(`/products/${report._id}`)}
                      className="bg-transparent border-2 border-[#003a43] px-4 py-2 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-4 py-2 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContents;
