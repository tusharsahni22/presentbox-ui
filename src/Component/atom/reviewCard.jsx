import React from "react";
import styled from "styled-components";
// import { LuQuote } from "react-icons/lu";

const Card = styled.article`
  background: #dee4ef;
  border-radius: 24px;
  /* padding: 32px; */
  min-width: 520px;
  display: flex;
  flex-direction: column;
  height: 275px;
`;

// const Quote = styled.div`
//   position: absolute;
//   top: 24px;
//   right: 32px;
//   font-size: 48px;
//   color: #9a9a9a;
// `;

// const Title = styled.h3`
//   font-size: 22px;
//   margin-bottom: 12px;
// `;

// const Message = styled.p`
//   font-size: 15px;
//   line-height: 1.6;
//   color: #666;
// `;

const Left = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
`;
// const Right = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 14px;
//   margin-top: 28px;
// `;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 7px;
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Stars = styled.div`
  color: #f6b100;
  font-size: 14px;
`;
const Circle = styled.div`
background-color: #fff;
 width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewCard = ({ data }) => {
  const { name, rating, avatar } = data; //title, message,

  return (
    <Card>
      <Left>
        <Circle>
        <Avatar src={avatar} alt={name} />
        </Circle>
        <div>
          <Name>{name}</Name>
          <Stars>{"★".repeat(rating)}</Stars>
        </div>
      </Left>
      {/* <Right>
       <Quote>
        <LuQuote />
      </Quote>
      <Title>{title}</Title>
      <Message>{message}</Message>
      </Right> */}
    </Card>
  );
};

export default ReviewCard;
