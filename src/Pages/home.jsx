import React from "react";
import Header from "../Component/layout/header.jsx";
import Footer from "../Component/layout/footer.jsx";
// import Card from "../Component/atom/card.jsx";
import VideoComponent from "../Component/atom/videoComponent.jsx";
import CategoryCard from "../Component/layout/categoryCards.jsx";

function Home() {
  return (
    <div
      // style={{
      //   backgroundImage:
      //     "url(https://i.pinimg.com/736x/39/13/90/391390a475ebd3fd253ef88a4c7f5552.jpg)",
      //   backgroundSize: "cover",
      //   height: "100vh",
      // }}
    >
      <VideoComponent src="./bgg.mp4" Text="A gifting company that turns moments into memories."/>
      <Header/>
      <CategoryCard/>

      <div style={{ height: "150vh" }}></div>
      <Footer />
    </div>
  );
}

export default Home;
