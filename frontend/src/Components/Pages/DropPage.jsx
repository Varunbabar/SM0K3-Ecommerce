import dropShoes from '../../Data/Shoes/dropShoes';
import FilterDrawer from '../Filter/FilterDrawer';
import HomeSectionCard from '../HomeCarousel/HomeSectionCardl';
import PromoBar from '../PromoBar/PromoBar';
import SortBy from '../Sort/SortBy';

const DropPage = () => {
    return(
        <div>
        <div className="pt-4 pl-4 text-2xl text-center">
            <h1>DROP'S</h1>
        </div>
        <PromoBar/>
        <div className="flex justify-between items-center px-4 py-4">
            <SortBy/>
            <FilterDrawer
                    underPrice="Under 5999"
                    midPrice="6000-8999"
                    highPrice="Above 9000"
              />  
            </div>    
            <div className="grid grid-cols-3 gap-6 p-8">
            {dropShoes.map((shoes,index) => (
                <HomeSectionCard key={index} product={shoes}/>
            )
        )}
            </div>
        
        </div>
    );
}
export default DropPage;
