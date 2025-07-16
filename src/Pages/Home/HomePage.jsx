import React from 'react';
import Banner from '../../Components/Banner/Banner';
import FeatureSection from '../../Components/FeatureSection/FeatureSection';
import AboutSection from '../../Components/AboutSection/AboutSection';
import PetCategorySection from '../../Components/PetCategorySection/PetCategorySection';

const HomePage = () => {
    return (
      <section className={`bg-gray-100`}>
        {/* Banner */}
        <Banner></Banner>
        <FeatureSection></FeatureSection>
        <AboutSection></AboutSection>
        <PetCategorySection></PetCategorySection>
       
      </section>
    );
};

export default HomePage;