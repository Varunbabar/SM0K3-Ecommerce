
import React from "react";
import AliceCarousel from "react-alice-carousel";
import { useNavigate } from "react-router-dom";
import { ImgCarousel } from "./ImgCarousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarousel = () => {
  const navigate = useNavigate();

  const items = ImgCarousel.map((item, index) => (
    <div
      key={index}
      className={`relative w-full h-[350px] sm:h-[450px] md:h-[550px] ${
        item.className || ""
      }`}
    >
      <img
        src={item.image}
        alt={`Sneaker collection ${index + 1}`}
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 flex items-end justify-end gap-3 px-6 md:px-16 pb-8 md:pb-12">
        {item.buttons?.map((button, buttonIndex) => (
          <button
            key={buttonIndex}
            onClick={() => navigate(button.path)}
            className="bg-[#FFFF00] text-black font-bold px-5 py-2 rounded hover:bg-[#FFD700] transition-colors shadow-md"
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="w-full">
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={3000}
        infinite
        mouseTracking
        disableButtonsControls
        disableDotsControls={false}
        animationDuration={800}
      />
    </div>
  );
};

export default MainCarousel;
