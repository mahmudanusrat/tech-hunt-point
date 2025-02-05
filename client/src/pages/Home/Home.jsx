import React from 'react';
import Banner from '../../components/Home/Banner/Banner';
import FeatureProducts from '../../components/Home/FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../../components/Home/TrendingProducts/TrendingProducts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureProducts></FeatureProducts>
            <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;