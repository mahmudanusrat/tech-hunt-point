import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useProductActions from "../../hooks/useProductActions";
import Button from "../Shared/Button/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowTrendUp } from "react-icons/fa6";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const axiosSecure = useAxiosSecure();
  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/products/${id}`);
      return data;
    },
  });
  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/reviews/${id}`);
      return data;
    },
  });
  const handlePostReview = async (description, rating) => {
    if (!isLoggedIn) return;

    try {
      const newReview = {
        description,
        rating: parseInt(rating, 10),
        reviewerName: user?.displayName || "Anonymous",
        reviewerImage: user?.photoURL || "",
      };
      await axiosSecure.post(`/products/${id}`, newReview);
      refetchReviews(); // Refresh reviews after posting
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const { handleVote, handleReport } = useProductActions(id, refetch);
  const {
    name,
    image,
    _id,
    tags,
    description,
    votes = 0,
    user: owner,
  } = product;
  const isOwner = user?.email === owner?.email;

  if (isLoading || isReviewsLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="container mx-auto px-4 py-6 text-[#003a43]">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 md:w-20 md:h-20 object-cover rounded-md transition-transform duration-200 hover:scale-105"
        />
        <div className="flex-1">
         <div className="flex gap-5 items-center mb-3">
         <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <a
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-[#003a43] px-2 py-2 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300 flex gap-1 items-center"
          >
            Visit{" "}
            <span>
              <FaArrowTrendUp />
            </span>
          </a>
          </div>
          <p className="text-md">{description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {(tags || []).map((tag, index) => (
              <span
                key={index}
                className="bg-[#ffb19c] text-sm px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
         
          <Button
            action={votes}
            onClick={() => handleVote(user?.email, isLoggedIn)}
            disabled={isOwner}
          ></Button>
          <Button
            onClick={() => handleReport(user?.email)}
            disabled={isOwner}
            variant="report" // Only shows the flag icon
          />
        </div>
      </div>
      <section className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-10 h-10 rounded-full"
                />
                <h4 className="font-semibold">{review.reviewerName}</h4>
              </div>
              <p className="text-sm text-gray-600">{review.description}</p>
              <span className="text-yellow-500 text-sm font-bold">
                Rating: {review.rating}/5
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mb-3">
            No reviews yet. Be the first to review!
          </p>
        )}
        {/* Review Form */}
        {isLoggedIn && (
          <form
            className="bg-gray-100 shadow-lg rounded-lg p-4 mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              const description = e.target.description.value;
              const rating = e.target.rating.value;
              handlePostReview(description, rating);
              e.target.reset();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Description
              </label>
              <textarea
                name="description"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Write your review..."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700  mb-2">
                Rating
              </label>
              <select
                name="rating"
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" 
            className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-8 py-3 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg">  
              Submit Review
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ProductDetails;
