import React from "react";
import Header from "../Component/layout/header.jsx";
import Footer from "../Component/layout/footer.jsx";
import FeatureCard from "../Component/atom/featureCard.jsx";
import ReviewCarousel from "../Component/layout/reviewCarousel.jsx";
import styled from "styled-components";
import {
  LuShoppingBag,
  LuTruck,
  LuHeadphones,
  LuRefreshCcw,
} from "react-icons/lu";



function Home() {

  const features = [
    {
      icon: LuShoppingBag,
      label: "Easy For Shopping",
    },
    {
      icon: LuTruck,
      label: "Fast & Free Shipping",
    },
    {
      icon: LuHeadphones,
      label: "24/7 Support",
    },
    {
      icon: LuRefreshCcw,
      label: "Money Back Guarantee",
    },
  ];
  const Section = styled.section`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 40px;
  justify-content: center;
`;
  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/39/13/90/391390a475ebd3fd253ef88a4c7f5552.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Header />
      <div style={{ height: "150vh" }}></div>
      <ReviewCarousel />
      <Section>
        {features.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </Section>
      <Footer />
    </div>
  );
}

export default Home;
