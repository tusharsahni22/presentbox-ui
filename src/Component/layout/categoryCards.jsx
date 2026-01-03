import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../atom/card.jsx";

function ProductsGrid() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/category-cards?populate=*"
        );
        const data = response.data.data;
        console.log("Fetched data:", data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr auto",
        gap: "20px",
      }}
    >
      {data && data.map((data) => (
        <ProductCard
          key={data.id}
          variant={data.variant}
          title={data.title}
          description={data.description}
          image={data?.img}
          cta={data.button.name}
          color={data.button.color}
      />
      ))}
    </div>
  );
}
export default ProductsGrid;
