import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

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
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-[#003a43] bg-[#f8f3eb] dark:bg-[#303030] dark:text-white" id="faq">
      <div className="container py-20 px-6 mx-auto">
        <h1 className="text-5xl font-semibold tracking-wide mb-16 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4 max-w-6xl mx-auto">
          {faqData.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`border border-base-300 rounded-lg ${
                  isActive ? "bg-[#8ca7a229]" : ""
                }`}
              >
                <div
                  className="flex justify-between items-center text-xl font-medium cursor-pointer p-4 hover:bg-[#8ca7a229]"
                  onClick={() => handleToggle(index)}
                >
                  <span>{faq.question}</span>
                  <span>
                    {isActive ? (
                      <FiMinus className="text-2xl" />
                    ) : (
                      <FiPlus className="text-2xl" />
                    )}
                  </span>
                </div>
                {isActive && (
                  <div className="p-4">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
