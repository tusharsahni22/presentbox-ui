import React from "react";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 25% auto;
  gap: 20px;
  margin-top: 10px;
`;

const Heading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const Subheading = styled.p`
  width: 90%;
  font-size: 18px;
  margin: 4px 0 0 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 60%;
  margin-top: 30px;
  overflow: hidden;
  border-radius: 20px;
  /* align-items: center;
  display: flex; */

  :hover {
    transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);

    filter: brightness(0.8) blur(1px);
  }
`;

function Headercards({ heading, subheading, img }) {
  return (
    <Div>
      <hr
        style={{
          width: "100%",
          borderTop: "2px solid #ffffff",
          marginTop: "16px",
          marginBottom: "20px",
        }}
      />
      <Grid>
        <div>
          <Heading className="heading headingColor">{heading}</Heading>
          <Subheading>{subheading}</Subheading>
        </div>
        <div>
          <ImageWrapper>
            <img
              style={{
                borderRadius: "20px",
                width: "100%",
                height: "70%",
                objectFit: "cover",
                // objectPosition: "center",
              }}
              src={img}
              alt="Img"
            />
          </ImageWrapper>
        </div>
      </Grid>
    </Div>
  );
}

export default Headercards;
