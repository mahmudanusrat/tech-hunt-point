import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import ProductCard from "./ProductCard";
import useDebounce from "../../hooks/useDebounce";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // State to manage sorting order
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", debouncedSearchTerm],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: { status: "Accepted", searchTerm: debouncedSearchTerm },
        }
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Function to handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  // Sort products based on the selected order
  const sortedProducts = (products || []).sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Filter products based on the search term
  const filteredProducts = sortedProducts.filter((product) =>
    product.tags.some((tag) =>
      tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  );

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen p-4 mb-10 text-[#003a43] dark:text-white">
      <div className="container mx-auto">
        <div className="space-y-3 mb-6">
          <h1 className="text-5xl font-semibold tracking-wide">
            Browse All Tech
          </h1>
          <p className="text-xl">Discover the endless possibilities.</p>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by tags..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
              refetch();
            }}
            className="w-full md:w-1/2 p-2 border rounded"
          />
          <div className="flex items-center text-black">
            <label className="mr-2 dark:text-white">Sort by Name:</label>
            <select
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} refetch={refetch} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-[#003a43] text-white"
                  : "bg-gray-200"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
