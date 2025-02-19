import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
        <p className="mt-4 text-lg text-gray-700">Something went wrong.</p>
        <p className="mt-2 text-sm text-gray-500">Please try again later or go back to the homepage.</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
