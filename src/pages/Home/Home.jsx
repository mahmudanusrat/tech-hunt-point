import React from "react";
import Banner from "../../components/Home/Banner/Banner";
import FeatureProducts from "../../components/Home/FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../../components/Home/TrendingProducts/TrendingProducts";
import TopContributors from "../../components/Home/TopContributors/TopContributors";
import Newsletter from "../../components/Home/Newsletter/Newsletter";
import WhoKnow from "../../components/Home/WhoKnow/WhoKnow";
import FAQ from "../../components/Home/FAQ/FAQ";
import Community from "../../components/Home/Community/Community";
import UserReviews from "../../components/Home/UserReviews/UserReviews";
import UpcomingEvents from "../../components/Home/UpcomingEvents/UpcomingEvents";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeatureProducts></FeatureProducts>
      <TrendingProducts></TrendingProducts>
      <UserReviews></UserReviews>
      {/* <TopContributors></TopContributors> */}
      <WhoKnow></WhoKnow>
      <UpcomingEvents></UpcomingEvents>
      <Community></Community>
      <Newsletter></Newsletter>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
