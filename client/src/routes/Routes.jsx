import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import MyProducts from "../pages/Dashboard/User/MyProducts";
import AddProduct from "../pages/Dashboard/User/AddProduct";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";
import Statistics from "../pages/Dashboard/Admin/Statistics";
import ProductDetails from "../components/Home/ProductDetails";
import Products from "../pages/Products/Products";
import UpdateProduct from "../components/Dashboard/User/UpdateProduct";
import ProductReview from "../pages/Dashboard/Moderator/ProductReview";
import ReportedContents from "../pages/Dashboard/Moderator/ReportedContents";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Registration /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },

      {
        path: "product-review",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <ProductReview></ProductReview>
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "reported-contents",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <ReportedContents></ReportedContents>
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },

      {
        index: true,
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Statistics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCoupons />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
