import { menShoes } from "../../Data/Shoes/menShoes";
import { menRunning } from "../../Data/Shoes/menRunning";
import FilterDrawer from "../Filter/FilterDrawer";
import HomeSectionCard from "../HomeCarousel/HomeSectionCardl";
import SortBy from "../Sort/SortBy";
import PromoBar from "../PromoBar/PromoBar";
const MenPage = () => {
  return (
    <div>
      <div className="pt-4 pl-4 text-2xl text-center">
        <h1>MEN FOOTWEAR</h1>
      </div>
      <PromoBar/>
      <div className="flex justify-between items-center py-4 px-2">
        <SortBy />
        <FilterDrawer
          underPrice="Under 3999"
          midPrice="4000-7999"
          highPrice="Above 8000"
        />
      </div>
      <div>
        {" "}
        <h2 className="text-2xl text-center font-semibold ">Sneakers</h2>
      </div>

      {
        <div className="grid grid-cols-3 gap-6 p-8">
          {menShoes.map((shoes, index) => (
            <HomeSectionCard key={index} product={shoes} />
          ))}
        </div>
      }
      <div><h2 className="text-center font-semibold text-2xl">Running Shoes</h2></div>
      {
        <div className=" grid grid-cols-3 gap-6 p-8">
          {menRunning.map((shoes, index) => (
            <HomeSectionCard key={index} product={shoes} />
          ))}
        </div>
      }
    </div>
  );
};
export default MenPage;
