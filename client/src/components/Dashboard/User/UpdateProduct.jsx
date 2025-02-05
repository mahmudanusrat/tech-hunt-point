import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utilities";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosSecure(`/products/${id}`);
        setProduct(data);
        setTags(data.tags.map((tag) => ({ id: tag, text: tag })));
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch product data.",
        });
      }
    };
    fetchProduct();
  }, [id, axiosSecure]);

  const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));
  const handleAddition = (tag) => setTags([...tags, tag]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const externalLink = form.externalLink.value;
    let imageUrl = product.image;
    
    if (form.image.files[0]) {
      imageUrl = await imageUpload(form.image.files[0]);
    }
    const updatedProduct = {
      name,
      description,
      image: imageUrl,
      externalLink,
      tags: tags.map((tag) => tag.text),
    };

    try {
      await axiosSecure.patch(`/products/${id}`, updatedProduct);
      Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "Your product has been updated successfully!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div className="text-center mt-10">Loading product data...</div>;
  }

  return (
    <div className="text-[#003a43] bg-gray-50 min-h-screen">
      <Helmet>
        <title>Update Product | Dashboard</title>
      </Helmet>

      <div className="max-w-4xl mx-auto shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Update Your Product</h1>
        <form onSubmit={handleUpdate} className="space-y-4 text-[#003a43]">
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
                defaultValue={product.name}
                required
              />
            </div>
            {/* Image Upload */}
            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                className="file-input file-input-bordered w-full"
                type="file"
                name="image"
                id="image"
                accept="image/*"
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
                defaultValue={product.description}
                required
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
                defaultValue={product.externalLink}
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
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
