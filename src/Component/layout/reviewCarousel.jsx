import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TestimonialCard from "../atom/reviewCard.jsx";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Section = styled.section``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Heading = styled.h2`
  font-size: 28px;
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
  &:disabled { opacity: 0.4; cursor: default; }
`;

const Track = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
  margin-bottom: 8px;
`;

const Item = styled.div`
  flex: 0 0 calc((100% - 48px) / 3);
  scroll-snap-align: start;
  @media (max-width: 900px) { flex: 0 0 calc((100% - 24px) / 2); }
  @media (max-width: 600px) { flex: 0 0 100%; }
`;

const ReviewCarousel = () => {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const data = [
    { name: "Alice Johnson", rating: 5, title: "Fantastic Service!", message: "I had an amazing experience shopping here. The products are top-notch and the customer service is outstanding!", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Bob Smith", rating: 4, title: "Great Quality", message: "The quality of the items I purchased exceeded my expectations. Will definitely shop here again.", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Catherine Lee", rating: 5, title: "Highly Recommend", message: "Fast shipping and excellent customer support. I highly recommend this store to all my friends and family.", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "David Brown", rating: 4, title: "Very Satisfied", message: "Overall, I'm very satisfied with my purchase. The website was easy to navigate and the checkout process was smooth.", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
  ];

  useEffect(() => {
    const track = document.querySelector('.review-track');
    if (!track) return;
    const onScroll = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setCanPrev(track.scrollLeft > 5);
      setCanNext(track.scrollLeft < maxScroll - 5);
    };
    onScroll();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { track.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const scrollByCard = (direction = 1) => {
    const track = document.querySelector('.review-track');
    const first = track?.querySelector(':scope > div');
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const cardW = first.getBoundingClientRect().width;
    const distance = Math.round(cardW + gap);
    track.scrollBy({ left: distance * direction, behavior: 'smooth' });
  };

  return (
    <Section>
      <Header>
        <div>
          <Heading>What customers are saying</Heading>
          <SubHeading>Experience the convenience and satisfaction shared by our community of shoppers.</SubHeading>
        </div>
        <Controls>
          <Button onClick={() => scrollByCard(-1)} disabled={!canPrev}><LuChevronLeft /></Button>
          <Button $active onClick={() => scrollByCard(1)} disabled={!canNext}><LuChevronRight /></Button>
        </Controls>
      </Header>

      <Track className="review-track" role="list">
        {data.map((item, i) => (
          <Item key={i} role="listitem"><TestimonialCard data={item} /></Item>
        ))}
      </Track>
    </Section>
  );
};

export default ReviewCarousel;
