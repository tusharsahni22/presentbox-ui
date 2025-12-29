import React from "react";
import styled from "styled-components";
import { LuArrowUpRight } from "react-icons/lu";

const Div = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 35% 25% auto;
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
  align-items: center;
  display: flex;

  :hover {
    transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);

    filter: brightness(0.8) blur(1px);
  }
`;

const Links = styled.div`
  display: flex;
  margin-left: 30px;
  margin-top: 30px;
  flex-direction: column;
  gap: 20px;
  font-weight: 400;
  text-decoration: underline;
  font-size: 16px;
`;

function Threegrid({ heading, subheading, links, img }) {
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
          <Links>
            {links.map((link) => (
              <div key={link}>
                {link}
                <LuArrowUpRight />
              </div>
            ))}
          </Links>
        </div>

        <div>
          <ImageWrapper>
            <img
              style={{
                borderRadius: "20px",
                width: "100%",
                height: "350px",
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

export default Threegrid;
