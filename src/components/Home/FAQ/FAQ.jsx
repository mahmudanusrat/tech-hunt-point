import React, { useState } from "react";

const faqData = [
  {
    question: "What is Product Hunt?",
    answer:
      "Product Hunt is a platform where users can discover and share new tech products. This includes web apps, mobile apps, software, hardware, and more.",
  },
  {
    question: "How do I submit a product?",
    answer:
      'To submit a product, you need to create an account and then click on the "Submit Product" button. You will be asked to provide some information about your product, such as its name, description, and website.',
  },
  {
    question: "How do I upvote a product?",
    answer:
      "To upvote a product, simply click on the upvote button next to the product listing. You can only upvote a product once.",
  },
  {
    question: "What are the different user roles?",
    answer:
      "There are three different user roles: normal users, moderators, and admins. Normal users can browse, upvote, and submit products. Moderators can review and approve products. Admins can manage user roles and monitor site activity.",
  },
  {
    question: "How does the payment system work?",
    answer:
      "The payment system allows users to unlock premium features or obtain extra facilities through paid subscriptions. You can subscribe to a premium plan to get access to these features.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Track the active question

  const handleToggle = (index) => {
    // If the current question is already active, set it to null (close it). Otherwise, open the clicked question.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-base-300 bg-base-100 rounded-lg"
          >
            <div
              className="text-xl font-medium cursor-pointer p-4 hover:bg-gray-200"
              onClick={() => handleToggle(index)}
            >
              {faq.question}
            </div>
            {/* Conditionally render the answer if the question is clicked */}
            {activeIndex === index && (
              <div className="p-4 bg-gray-50">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
