import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utilities";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Button" },
  });
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  // ReactTags handlers
  const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));
  const handleAddition = (tag) => setTags([...tags, tag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);
    const externalLink = form.externalLink.value;
    const productsData = {
      name,
      description,
      image: imageUrl,
      externalLink,
      tags: tags.map((tag) => tag.text),
      user: {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      },
      timestamp: new Date(),
      status: "Pending",
      votes: 0,
    };

    try {
      await axiosSecure.post("/products", productsData);
      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Your product has been added successfully!",
      });
      navigate("/dashboard/my-products");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-[#003a43] bg-gray-50 min-h-screen">
      <Helmet>
        <title>Add Product | Dashboard</title>
      </Helmet>
      <div className="max-w-4xl mx-auto shadow-xl rounded-xl p-8">
        <div className="text-center space-y-3 mb-5 ">
          <h1 className="text-3xl font-semibold">Add Your Product</h1>
          <p className="text-xl">Share your innovation with the world.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-[#003a43]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Product Name */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                className="input input-bordered w-full"
                name="name"
                id="name"
                type="text"
                placeholder="Enter Product Name"
                required
              />
            </div>
            {/* Image Upload */}
            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                onChange={(e) =>
                  setUploadImage({
                    image: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  })
                }
                className="file-input file-input-bordered w-full"
                type="file"
                name="image"
                id="image"
                accept="image/*"
                required
              />
            </div>
            {/* Description */}
            <div className="form-control lg:col-span-2">
              <label htmlFor="description" className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                className="textarea textarea-bordered bg-white"
                name="description"
              ></textarea>
            </div>
            {/* Tags */}
            <div className="form-control">
              <label htmlFor="tags" className="label">
                <span className="label-text">Tags</span>
              </label>
              <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                placeholder="Add a tag"
                classNames={{
                  tags: "flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50",
                  tagInputField: "p-2 rounded-md w-full bg-white",
                  tag: "bg-lime-200 p-2 rounded-lg text-sm flex items-center",
                  remove: "ml-1 text-red-500 cursor-pointer",
                }}
              />
            </div>
            {/* External Link */}
            <div className="form-control">
              <label htmlFor="externalLink" className="label">
                <span className="label-text">External Link</span>
              </label>
              <input
                type="url"
                id="externalLink"
                name="externalLink"
                className="input input-bordered bg-white"
                placeholder="Enter product link"
              />
            </div>
          </div>
          {/* Owner Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
            <div>
              <label className="label">
                <span className="label-text">Owner Image</span>
              </label>
              <img
                src={user?.photoURL || ""}
                alt="Owner"
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Owner Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                className="input input-bordered "
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Owner Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="input input-bordered"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`btn w-full text-[#003a43] bg-[#ff8d6e] hover:border-[#ff8d6e] hover:bg-[#ffb19c] font-semibold${
                loading ? "btn-disabled" : "bg-[#ff8d6e]"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
