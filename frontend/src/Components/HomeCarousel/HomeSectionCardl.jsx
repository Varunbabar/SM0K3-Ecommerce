import React from "react";
import { useNavigate } from "react-router-dom";
const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (product.path) {
          navigate(product.path);
        } else {
          navigate(`/product/${product.id}`);
        }
      }}
      className="
      group
      cursor-pointer 
      w-[24rem]
      h-[28rem]
      bg-white 
      rounded-2xl shadow-sm
       overflow-hidden
      transition-all 
      duration-300 
      hover:-translate-y-2 "
    >
      <div className="h-[24rem] bg-[white] flex items-center justify-center ">
        <img
          className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-500 hover:scale-x1"
          src={product.image || product.image}
          alt={product.title || "product"}
        />
      </div>
      <div className="p-4">
        <div className="= flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold mt-1">{product.title}</h3>
            <h3 className="text-lg font-semi-bold mt-1">{product.name}</h3>
            <p className="uppercase tracking-wide text-sm text-gray-500">
              {product.brand}
            </p>
          </div>
          <p className="mt-3 text-md font-semi-bold">₹{product.price} </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSectionCard;
