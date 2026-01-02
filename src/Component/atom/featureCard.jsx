import React from "react";
import styled from "styled-components";

const Card = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 16px 20px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  min-width: 220px;
  width: 300px;
  height: 110px;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #eef7f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #2aa6a0;
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const FeatureCard = ({ icon: Icon, label }) => {
  return (
    <Card>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Text>{label}</Text>
    </Card>
  );
};

export default FeatureCard;
