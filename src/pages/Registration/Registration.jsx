import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload, saveUser } from "../../api/utilities";
import Swal from "sweetalert2";

const Registration = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useAuth();
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const photoURL = await imageUpload(image);

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await saveUser({...result?.user, displayName:name, photoURL});
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Registration successfully",
        text: "Welcome back!",
      });
    } catch (err) {
      console.error("Registration Error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err?.message || "Something went wrong!",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Registration successfully",
        text: "Welcome back!",
      });
    } catch (err) {
      console.error("Registration Error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err?.message || "Something went wrong!",
      });
    }
  };
  return (
    <div className="text-[#ebf0ef] bg-[#003a43] min-h-screen py-5">
      <div className="hero-content flex-col lg:flex-row max-w-screen-xl mx-auto lg:gap-20">
        <div className="text-center lg:text-left space-y-4">
          <h1 className="text-5xl font-semibold">Join Tech Hunt Point Today!</h1>
          <p className="text-2xl">
          Be part of the innovation revolution.
          </p>
        </div>
        <div className="card bg-base-100 text-[#003a43]  lg:mt-16 w-full max-w-md shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <p className="text-2xl text-center mb-6">
              Sign up today and start exploring the latest innovations! <br />
            </p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name*"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Image</span>
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-input file-input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Here"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="bg-[#ff8d6e]  border-2 hover:border-[#ff8d6e] px-8 py-3 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
              >
                Sign Up
              </button>
            </div>
            <div className="divider">OR</div>
          </form>
          <div className="form-control -mt-4 px-7">
            <button
              onClick={handleGoogleSignIn}
              className="bg-transparent border-2 border-[#003a43] px-8 py-3 rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300"
            >
              Continue with Google
            </button>
          </div>
          <p className="text-center text-sm my-6">
            Already have an account?
            <Link
              to="/login"
              className="link link-hover font-bold text-[#003a43]"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
