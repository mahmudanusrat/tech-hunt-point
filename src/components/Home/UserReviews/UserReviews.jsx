import React from 'react';

const UserReviews = () => {
  const reviews = [
    {
      id: 1,
      productName: 'Product A',
      rating: 4,
      review: 'Fantastic product! It really improved my workflow. Highly recommend it!',
      user: 'User123',
      imgSrc: 'https://via.placeholder.com/200',
    },
    {
      id: 2,
      productName: 'Product B',
      rating: 5,
      review: 'The best tool I’ve used for project management. Great features and easy to use.',
      user: 'User456',
      imgSrc: 'https://via.placeholder.com/200',
    },
    // Add more reviews here
  ];

  return (
    <section className="py-10 bg-gray-100" id="user-reviews">
      <h2 className="text-3xl font-bold text-center mb-6">User Reviews & Ratings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {reviews.map((review) => (
          <div key={review.id} className="card w-full bg-white shadow-xl rounded-lg p-4">
            <img src={review.imgSrc} alt={review.productName} className="rounded-lg w-full h-48 object-cover" />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{review.productName}</h3>
              <div className="flex items-center my-2">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-yellow-500 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{review.review}</p>
              <p className="text-sm font-semibold text-gray-500 mt-2">- {review.user}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;
