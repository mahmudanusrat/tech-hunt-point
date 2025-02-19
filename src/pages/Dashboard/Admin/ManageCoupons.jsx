import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discount: "",
  });

  const { data: coupons = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const { data } = await axiosSecure('/coupons')
      return data
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingCoupon) {
      try {
        await axiosSecure.put(`/coupons/${editingCoupon._id}`, formData);
        Swal.fire("Success", "Coupon updated successfully!", "success");
        setEditingCoupon(null);
      } catch (error) {
        Swal.fire("Error", "Failed to update coupon!", "error");
      }
    } else {
      try {
        await axiosSecure.post("/coupons", formData);
        Swal.fire("Success", "Coupon added successfully!", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to add coupon!", "error");
      }
    }

    setFormData({ code: "", expiryDate: "", description: "", discount: "" });
    refetch();
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/coupons/${id}`);
      Swal.fire("Deleted!", "Coupon deleted successfully.", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to delete coupon!", "error");
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      expiryDate: coupon.expiryDate,
      description: coupon.description,
      discount: coupon.discount,
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Coupons</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="label">Coupon Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">Expiry Date</label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">Discount Amount</label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="lg:col-span-2">
            <label className="label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-4 py-2 w-full rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
          >
          {editingCoupon ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Expiry Date</th>
              <th>Discount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td>{coupon.discount}%</td>
                <td>{coupon.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => handleEdit(coupon)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(coupon._id)}
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

export default ManageCoupons;
