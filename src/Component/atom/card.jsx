import React from "react";
import styled, { css } from "styled-components";
// import { LuArrowUpRight } from "react-icons/lu";
import CardButtons from "./cardButtons";
import { getImageUrl } from "../../api/config";

const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  ${({ $variant }) =>
    $variant === "big" &&
    css`
      flex-direction: column;
      grid-row: span 2;
    `}

  ${({ $variant }) =>
    $variant === "rect" &&
    css`
      flex-direction: row;
      align-items: center;
      grid-column: span 2;
    `}

  ${({ $variant }) =>
    $variant === "square" &&
    css`
      flex-direction: column;
    `}
`;

const ImageWrap = styled.div`
  flex-shrink: 0;

  ${({ $variant }) =>
    $variant === "rect"
      ? css`
          width: 180px;
        `
      : css`
          width: 100%;
        `}

  img {
    width: 100%;
    height: ${({ $variant }) => ($variant === "big" ? "400px" : "200px")};
    object-fit: cover;
    border-radius: 14px;
  }
`;

const Content = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  font-size: 20px;
  margin: 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;


function ProductCard({
  variant,
  title,
  description,
  image,
  cta,
  color,
}) 
{
    
  return (
 
        
    <Card $variant={variant}>
      <ImageWrap $variant={variant}>
        <img src={getImageUrl(image)} alt={title} />
      </ImageWrap>

      <Content>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <CardButtons color={color} cta={cta}/>
      </Content>
    </Card>

  );
}

export default ProductCard;
