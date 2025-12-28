import React from "react";
import Header from "../Component/header.jsx";

function Home() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/39/13/90/391390a475ebd3fd253ef88a4c7f5552.jpg)",
        backgroundSize: "cover",
        height: "200vh",
      }}
    >
      <Header />
    </div>
  );
}

export default Home;
