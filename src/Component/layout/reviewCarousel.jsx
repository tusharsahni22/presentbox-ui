import React, {useState } from "react";
import styled from "styled-components";
import TestimonialCard from "../atom/reviewCard.jsx";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Section = styled.section`
  padding: 80px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Heading = styled.h2`
  font-size: 36px;
  margin: 0;
`;

const SubHeading = styled.p`
  margin-top: 8px;
  color: #777;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? "#000" : "#eee")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;
`;

const Track = styled.div`
  display: flex;
  gap: 32px;
  overflow: hidden;
`;

const ReviewCarousel = () => {
  // const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const data = [
    {
      name: "Alice Johnson",  
      rating: 5,
      title: "Fantastic Service!",
      message:
        "I had an amazing experience shopping here. The products are top-notch and the customer service is outstanding!",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Bob Smith",
      rating: 4,
      title: "Great Quality",
      message:
        "The quality of the items I purchased exceeded my expectations. Will definitely shop here again.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Catherine Lee",
      rating: 5,
      title: "Highly Recommend",
      message:
        "Fast shipping and excellent customer support. I highly recommend this store to all my friends and family.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "David Brown",
      rating: 4,
      title: "Very Satisfied",
      message:
        "Overall, I'm very satisfied with my purchase. The website was easy to navigate and the checkout process was smooth.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  // useEffect(() => {
    // fetch("http://localhost:1337/api/testimonials?populate=*")
    //   .then(res => res.json())
    //   .then(res => {
    //     const formatted = res.data.map(item => ({
    //       name: item.attributes.name,
    //       rating: item.attributes.rating,
    //       title: item.attributes.title,
    //       message: item.attributes.message,
    //       avatar:
    //         "http://localhost:1337" +
    //         item.attributes.avatar.data.attributes.url,
    //     }));
    //     setData(formatted);
    //   });
    // setData(sampleData);
  // }, []);

  

  const next = () => {
    if (index < data.length - 2) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <Section>
      <Header>
        <div>
          <Heading>What customers are saying</Heading>
          <SubHeading>
            Experience the convenience and satisfaction shared by our
            community of shoppers.
          </SubHeading>
        </div>

        <Controls>
          <Button onClick={prev}>
            <LuChevronLeft />
          </Button>
          <Button $active onClick={next}>
            <LuChevronRight />
          </Button>
        </Controls>
      </Header>

      <Track style={{ transform: `translateX(-${index * 560}px)` }}>
        {data.map((item, i) => (
          <TestimonialCard key={i} data={item} />
        ))}
      </Track>
    </Section>
  );
};

export default ReviewCarousel;
