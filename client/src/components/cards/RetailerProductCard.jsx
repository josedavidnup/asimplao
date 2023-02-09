import React from "react";

const RetailerProductCard = ({ product }) => {
  const { title, description, images } = product;
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg m-10 dark:bg-gray-700 bg-slate-200 ">
      <img
        className="w-full"
        src={images && images.length ? images[0].url : ""}
        alt={title}
      />
      <div className="px-6 py-4 dark:text-gray-200 text-gray-700">
        <div className="font-bold text-xl mb-2"> {title} </div>
        <p className="dark:text-gray-200 text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};

export default RetailerProductCard;
