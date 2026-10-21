import React from 'react';
import MainCarousel from '../HomeCarousel/MainCarousel';
import { SectionCarousel } from '../HomeCarousel/SectionCarousel';
import { shoes } from '../../Data/Shoes/shoes';
import LaceCarousel from "../HomeCarousel/LaceCarousel";

const HomePage = () => {
    return (
        <div>
            <MainCarousel/>

            <div className="space-y-1 py-1 flex flex-col justify-center px-5 lg:px-20">
                <SectionCarousel
                    data={shoes}
                    sectionName=""
                />
            </div>

            <LaceCarousel/>
        </div>
    );
};

export default HomePage;