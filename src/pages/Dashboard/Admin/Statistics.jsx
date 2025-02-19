import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import { FaUserAlt } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { Helmet } from "react-helmet-async";
const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ["admin-stat"],
    queryFn: async () => {
      const { data } = await axiosSecure("/admin-stats");
      return data;
    },
  });

  const { users, products, reviews, productStats } = statData || {};
  console.log(productStats);
  if (isLoading) return <LoadingSpinner />;

  const pieChartData = [
    { name: "Users", value: users || 0 },
    { name: "Products", value: products || 0 },
    { name: "Reviews", value: reviews || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <div>
      <Helmet>Statistic</Helmet>
      <div className="p-6">
      <h1 className="text-3xl font-semibold text-center text-[#003a43]">
      Platform Insights</h1>
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="relative flex flex-col rounded-xl shadow-md">
              <div className="absolute -mt-4 mx-4 h-14 w-14 grid place-items-center bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-xl">
                <FaUserAlt className="w-5 h-5" />
              </div>
              <div className="p-4 text-right">
                <p className="text-sm font-normal text-blue-gray-600">
                  Total Users
                </p>
                <h4 className="text-2xl font-semibold text-blue-gray-900">
                  {users}
                </h4>
              </div>
            </div>

            <div className="relative flex flex-col bg-white rounded-xl shadow-md">
              <div className="absolute -mt-4 mx-4 h-14 w-14 grid place-items-center bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-xl">
                <BsFillCartPlusFill className="w-5 h-5" />
              </div>
              <div className="p-4 text-right">
                <p className="text-sm font-normal text-blue-gray-600">
                  Total Products
                </p>
                <h4 className="text-2xl font-semibold text-blue-gray-900">
                  {products}
                </h4>
              </div>
            </div>

            <div className="relative flex flex-col bg-white rounded-xl shadow-md">
              <div className="absolute -mt-4 mx-4 h-14 w-14 grid place-items-center bg-gradient-to-tr from-pink-600 to-pink-400 text-white rounded-xl">
                <BsFillHouseDoorFill className="w-5 h-5" />
              </div>
              <div className="p-4 text-right">
                <p className="text-sm font-normal text-blue-gray-600">
                  Total Reviews
                </p>
                <h4 className="text-2xl font-semibold text-blue-gray-900">
                  {reviews}
                </h4>
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Pie Chart */}
            <div className="relative flex flex-col bg-white rounded-xl shadow-md lg:col-span-2 p-4">
              <h2 className="text-xl font-semibold mb-4">
                Site Statistics Overview
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      ResponsiveContainer
                      cy="50%"
                      outerRadius="80%"
                      fill="#8884d8"
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="relative flex flex-col bg-white rounded-xl shadow-md p-4 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <div className="w-full h-full">
                <Calendar
                  date={new Date()}
                  className="mx-auto"
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
