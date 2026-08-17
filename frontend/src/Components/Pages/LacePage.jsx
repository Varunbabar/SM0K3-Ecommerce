import {lace} from '../../Data/Shoes/lace'
import HomeSectionCard from '../HomeCarousel/HomeSectionCardl';

const LacePage = () =>{
    return(
        <div>
        
            <div className="pt-4 pl-4 text-2xl">
            <h1>SHOE LACE</h1>
            </div>
        {
        <div className="grid grid-cols-3 gap-6 p-8">
            {lace.map((lace,index)=>(
                <HomeSectionCard key={index} product={lace}/>
            )
            )}
        </div>
        }
       </div>    
    )
}
export default LacePage;