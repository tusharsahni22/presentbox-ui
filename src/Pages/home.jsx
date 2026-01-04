import React from "react";
import Header from "../Component/layout/header.jsx";
import Footer from "../Component/layout/footer.jsx";
// import Card from "../Component/atom/card.jsx";
import VideoComponent from "../Component/atom/videoComponent.jsx";
import CategoryCard from "../Component/layout/categoryCards.jsx";
import FeatureCard from "../Component/atom/featureCard.jsx";
import ReviewCarousel from "../Component/layout/reviewCarousel.jsx";
import styled from "styled-components";
import {
  LuShoppingBag,
  LuTruck,
  LuHeadphones,
  LuRefreshCcw,
} from "react-icons/lu";



const Section = styled.section`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 40px;
  justify-content: center;
`;

const Body = styled.div`
  max-width: 1500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

function Home() {
  const features = [
    { icon: LuShoppingBag, label: "Easy For Shopping" },
    { icon: LuTruck, label: "Fast & Free Shipping" },
    { icon: LuHeadphones, label: "24/7 Support" },
    { icon: LuRefreshCcw, label: "Money Back Guarantee" },
  ];

  return (
    <div>
      <VideoComponent src="./bgg.mp4" Text="A gifting company that turns moments into memories." />
      <Header />
      <Body>
        <CategoryCard />
        <ReviewCarousel />
        <Section>
          {features.map((item, index) => (
            <FeatureCard key={index} icon={item.icon} label={item.label} />
          ))}
        </Section>
      </Body>
      <Footer />
    </div>
  );
}

export default Home;
