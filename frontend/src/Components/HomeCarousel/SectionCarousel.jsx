import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "./HomeSectionCardl";

export const SectionCarousel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 2 },
    1024: { items: 3 },
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const items = data
   .slice(activeIndex, activeIndex + 3)
.map((item) => (
  <HomeSectionCard key={item.id} product={item} />
));
  return (
    <div>
      <h2 className="text-xxl font-extrabold text-grey-500 py-5">
        {sectionName}
      </h2>
      <h1 className="text-2xl font-semibold pt-4 pb-1 text-center text-grey-500 ">
        CATEGORIES
      </h1>
      <div className="relative p-5 flex flex-col justify-center items-center">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          mouseTracking
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  );
};
