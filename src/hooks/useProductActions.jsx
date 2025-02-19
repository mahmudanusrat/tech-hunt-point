
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

const useProductActions = (productId, refetch) => {
  const navigate = useNavigate();
const axiosSecure = useAxiosSecure()
  // Handle Vote
  const handleVote = async (userEmail, isLoggedIn) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "You need to log in",
        text: "Please log in to vote.",
      }).then(() => navigate("/login"));
      return;
    }
    try {
      await axiosSecure.patch(`/products/vote/${productId}`, {
        userEmail,
      });
      refetch(); // Refresh the product data
      Swal.fire({
        icon: "success",
        title: "Vote Submitted",
        text: "Your vote has been recorded.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You can only vote once.",
      });
    }
  };

  // Handle Report
  const handleReport = async (userEmail) => {
    if (!userEmail) {
      Swal.fire({
        icon: "warning",
        title: "You need to log in",
        text: "Please log in to report a product.",
      }).then(() => navigate("/login"));
      return;
    }

    try {
      await axiosSecure.patch(`/products/report/${productId}`, {
        userEmail,
      });
      refetch(); // Refresh the product data if necessary
      Swal.fire({
        icon: "success",
        title: "Product Reported",
        text: "The product has been reported successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You can only report once.",
      });
    }
  };

  return { handleVote, handleReport };
};

export default useProductActions;
