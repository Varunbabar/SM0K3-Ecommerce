import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ImgCarousel } from "./ImgCarousel";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainCarousel = () => {

  const navigate = useNavigate();

  const items = ImgCarousel.map((item, index) => (
    <div key={index} className="relative w-full h-[500px]">

      <img
        src={item.image}
        alt="Carousel"
        className="w-full h-full object-contain"
      />

      <div className="absolute bottom-10 right-10 flex gap-4">
        {item.buttons.map((button, i) => (
          <Button
            key={index}
            variant="contained"
            sx={{
                bgcolor : "beige",
                color: "black",
            }}
            onClick={() => navigate(button.path)}
          >
            {button.text}
          </Button>
        ))}
      </div>

    </div>
  ));

  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval={3000}
      disableButtonsControls
      infinite
    />
  );
};

export default MainCarousel;