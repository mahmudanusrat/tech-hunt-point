import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-users/${user?.email}`);
      return data;
    },
  });

  const handleRoleChange = async (userEmail, newRole) => {
    try {
      await axiosSecure.patch(`/users/role/${userEmail}`, {
        role: newRole,
      });
      refetch();
    } catch (error) {
      console.error(`Failed to update role for ${userEmail}:`, error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-2 md:p-8 bg-gray-50 min-h-screen dark:bg-[#303030] dark:text-white text-[#003a43] ">
      <Helmet>
        <title>My Users | Dashboard</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-center mb-6">My Users</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full dark:bg-[#303030] dark:text-white  border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border"> Name</th>
              <th className="px-4 py-2 border"> Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleRoleChange(user.email, "Admin")}
                    className="bg-transparent border-2 border-[#003a43] px-4 py-2 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300"
                    >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleRoleChange(user.email, "Moderator")}
                    className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-4 py-2 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
                  >
                    Make Moderator
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

export default ManageUsers;
