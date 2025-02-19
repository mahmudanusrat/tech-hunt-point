import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProductActions from "../../hooks/useProductActions";
import Button from "../../components/Shared/Button/Button";

const ProductCard = ({ product, refetch }) => {
  const { name, image, _id, tags, votes = 0, user: owner } = product;
  const { user } = useAuth();
  const isOwner = user?.email === owner?.email;

  const { handleVote, handleReport } = useProductActions(_id, refetch);

  return (
    <div className="bg-[#ebf0ef] max-w-full border rounded-lg shadow-md overflow-hidden hover:bg-slate-100 text-[#003a43] dark:text-white dark:bg-[#1f1f1f] dark:hover:bg-[#303030]">
      <div className="flex items-center p-4">
        <Link to={`/products/${_id}`} className="flex gap-3 items-center">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 object-cover transition-transform duration-200 hover:scale-105"
          />
          <div>
            <h3 className="text-lg font-semibold ">{name}</h3>
            <div className="flex flex-wrap gap-2 my-2">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#ffb19c]  text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
        <div className="ml-auto flex gap-3">
          <Button
            action={votes}
            onClick={() => handleVote(user?.email, !!user)}
            disabled={isOwner}
            variant="vote"
          />
          <Button
            onClick={() => handleReport(user?.email)}
            disabled={isOwner}
            variant="report" 
          />
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    votes: PropTypes.number,
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ProductCard;
