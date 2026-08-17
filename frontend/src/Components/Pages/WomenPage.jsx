import {womenShoes} from "../../Data/Shoes/womenShoes";
import { womenRunning } from "../../Data/Shoes/womenRunning";
import FilterDrawer from "../Filter/FilterDrawer";
import HomeSectionCard from "../HomeCarousel/HomeSectionCardl";
import PromoBar from "../PromoBar/PromoBar";
import SortBy from "../Sort/SortBy";
const WomenPage = () => {
  return (
    <div>
      <div className="pt-4 pl-4 text-2xl text-center">
        <h1>WOMEN FOOTWEAR</h1>
      </div>
      <PromoBar />
      <div className="flex justify-between items-center py-4 px-2">
        <SortBy />
        <FilterDrawer
          underPrice="Under 5999"
          midPrice="6000-8999"
          highPrice="Above 9000"
        />
      </div>
      <div>
        <h2 className="text-center font-semibold text-2xl">Sneakers</h2>
      </div>

      {
        <div className="grid grid-cols-3 gap-6 p-8">
          {womenShoes.map((shoes, index) => (
            <HomeSectionCard key={index} product={shoes} />
          ))}
        </div>
      }
      <div>
        <h2 className="text-center font-semibold text-2xl">Running Shoes</h2>
      </div>

      {
        <div className="grid grid-cols-3 gap-6 p-8">
          {womenRunning.map((shoes, index) => (
            <HomeSectionCard key={index} product={shoes} />
          ))}
        </div>
      }
    </div>
  );
};
export default WomenPage;
