import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import { saveUser } from "../../api/utilities";

const Login = () => {
  const { user, signIn,signInWithGoogle } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/';
  
  if (user) return <Navigate to='/' replace={true} />
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    try {
      // User Login
      await signIn(email, password);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err?.message || 'Something went wrong!',
        showClass: {
          popup: 'animate__animated animate__shakeX animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      Swal.fire({
        icon: 'success',
        title: 'Google Login Successful',
        text: 'Welcome to the platform!',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: err?.message || 'Please try again!',
        showClass: {
          popup: 'animate__animated animate__shakeX animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
      });
    }
  };

  return (
    <div className="bg-[#003a43]  min-h-screen flex justify-center items-center py-5">
    <div className="card bg-[#ebf0ef] text-[#003a43] max-w-md w-full shadow-2xl rounded-md p-6">
      <div className="text-center space-y-4 mb-6">
        <h2 className="text-3xl font-semibold">We are Tech Hunt Point</h2>
        <p className="text-lg">
          Welcome back! Log in to your account to view the latest updates.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        className="space-y-6"
      >
        <div className="form-control space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter Your Email Here"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="*******"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#ff8d6e] border-2 hover:border-[#ff8d6e] w-full py-3 rounded-full font-semibold hover:bg-[#ffb19c] transition duration-300 shadow-lg"
          >
            Login
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <button className="text-sm hover:underline text-[#003a43]">
          Forgot password?
        </button>
      </div>
      <div className="divider my-6">OR</div>
      <div
        onClick={handleGoogleSignIn}
        className="flex justify-center items-center border-2 border-[#003a43] rounded-full py-3 cursor-pointer hover:bg-[#b5dad3] transition duration-300"
      >
        Continue with Google
      </div>
      <p className="text-center text-sm mt-6">
        Don&apos;t have an account yet?{' '}
        <Link
          to="/register"
          className="link link-hover font-bold text-[#003a43]"
        >
          Sign up
        </Link>
        .
      </p>
    </div>
  </div>
  
  );
};

export default Login;
