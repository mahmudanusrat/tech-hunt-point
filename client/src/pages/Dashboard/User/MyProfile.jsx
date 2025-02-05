import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineVerified } from "react-icons/md";
const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const subscriptionAmount = 20.09;

  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subscriptionStatus", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`users/subscription/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleSubscribeClick = () => {
    setShowModal(true);
  };

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    try {
      await axiosSecure.patch(`/users/subscribe/${user?.email}`);
      refetch();
      setShowModal(false);
    } catch (err) {
      console.error("Error updating subscription:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading || subscriptionLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <p className="text-red-500">
        Error fetching subscription status: {error.message}
      </p>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full">
        <div className="p-8 text-center">
          <div className="justify-center">
            <Link to="/">
              <img
                alt="profile"
                src={user.photoURL}
                className="object-cover rounded-full h-32 w-32 mx-auto border-4 border-gray-300"
              />
            </Link>
          </div>
          <div className="mt-6">
            <p className="text-2xl font-semibold">{user.displayName}</p>
            <p className="text-lg font-extralight">
              <span className="font-semibold">Email: </span> {user.email}
            </p>
          </div>
          {!subscriptionData?.isSubscribed ? (
            <button
              className="bg-[#ff8d6e] mr-3 border-2 hover:border-[#ff8d6e] px-8 py-3 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
              onClick={handleSubscribeClick}
              aria-label="Subscribe"
            >
              {isProcessing
                ? "Processing..."
                : `Subscribe - $${subscriptionAmount}`}
            </button>
          ) : (
            <div className="mt-4 text-xl flex items-center justify-center font-semibold text-[#003a43]">
              <MdOutlineVerified />
              <p className="ml-2">Verified</p>
            </div>
          )}

          {showModal && (
            <div
              role="dialog"
              aria-labelledby="payment-title"
              aria-describedby="payment-description"
              className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 id="payment-title" className="text-xl font-bold mb-4">
                  Payment Checkout
                </h2>
                <p id="payment-description" className="mb-4">
                  Subscribe for ${subscriptionAmount} to gain full access.
                </p>
                <button
                  className="bg-[#ff8d6e] mr-3 border-2 hover:border-[#ff8d6e] px-8 py-3 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
                  onClick={handlePaymentSuccess}
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay $${subscriptionAmount}`}
                </button>
                <button
                  className="bg-transparent border-2 border-[#003a43] px-8 py-3 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
