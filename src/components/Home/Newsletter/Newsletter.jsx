import React from 'react';

const Newsletter = () => {
    return (
        <div className="max-w-7xl mx-auto py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <input type="email" placeholder="Enter your email" className="p-2 border rounded" />
        <button className="ml-2 px-4 py-2 bg-[#ff8d6e] text-white rounded">Subscribe</button>
      </div>
    );
};

export default Newsletter;