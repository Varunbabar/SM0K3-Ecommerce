
import React from "react";
import { ImgCarousel } from "./ImgCarousel";

const MainCarousel = () => {
  const items = ImgCarousel.map((item, index) => (
    <div
      key={item.id ?? item.image ?? item.img ?? index}
      className="relative w-full h-[500px]"
    >
      {/* Keep your existing slide content here */}
    </div>
  ));

  return (
    <div>
      {items}
    </div>
  );
};

export default MainCarousel;
