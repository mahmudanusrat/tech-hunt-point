import React from "react";

const UserReviews = () => {
  return (
    <div className="container pb-20 px-6 text-[#003a43] mx-auto">
      <div className="mb-6 space-y-3 text-center dark:text-white">
        <h1 className="text-5xl font-semibold tracking-wide">
          The People Who Know Products
        </h1>
        <p className="text-xl">
          Curating only the best in tech is literally what we do. All day. Every
          day. We're very good at it.
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            review:
              "“For me it is a great source of inspiration. I get ideas and feel very creative after browsing PH and also the newsletter is just fantastic. Great gift of the internet.”",
            user: "Samin Chowdhury",
          },
          {
            id: 2,
            review:
              "“Your newsletter is one of the very few that I read on a daily basis. It’s on one hand the copy, but above all the content and the quality of the apps you post (almost) e v e r y d a y !”",
            user: "Creatif Comunicación",
          },
          {
            id: 3,
            review:
              "“I tell everyone who I think would care about Product Hunt. It is literally the only daily or weekly or monthly newsletter that I check out regularly. And I save them if I can’t read them on the day of.”",
            user: "Shelby Joy Scarbrough",
          },
        ].map((review) => (
          <div
            key={review.id}
            className="bg-[#f8f3eb] p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 will-change-transform"
          >
            <p className="italic">{review.review}</p>
            <h4 className="mt-4 font-bold">{review.user}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
