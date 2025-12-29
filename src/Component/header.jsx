import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";
import Twogrid from "./atom/twogrid";
import Threegrid from "./atom/threegrid";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  padding: 16px 24px;
  width: 100%;
  position: fixed;
`;

const Hover = styled.div`
  font-size: 20px;
  margin: 10px 0px;
  padding: 8px 16px;
  border-radius: 25px;
  background-color: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  transition: background-color 0.2s ease;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const Head = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Logo = styled.div`
  font-family: "BBH Bartle", sans-serif;
  font-weight: 400;
  font-size: 16px;
`;
const Cover = styled.div`
  display: ${({ $collapsed }) => ($collapsed ? "none" : "flex")};
  gap: 12px;
  align-items: center;
  height: 54px;
  padding: 10px 20px;
  width: ${({ $active }) => ($active ? "100%" : "fit-content")};
  overflow: hidden;
  /* background-image: url("https://i.pinimg.com/1200x/68/a5/03/68a503d245800db249bd5bd751787b89.jpg"); */
  background: var(
    --lds-g-color-palette-transparent-black-080,
    rgba(0, 0, 0, 0.8)
  );
  /* background-color: var(--lds-g-color-palette-transparent-black-080); */
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
  color: #ffffff;

  &:hover {
    cursor: pointer;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.3s ease-in-out;
    padding: 60px;
    overflow: hidden;
    background-size: cover;
  }
`;

function Header() {
  const [hovered, setHovered] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState("home");
  const leftActive = hovered === "left";
  const rightActive = hovered === "right";
  const isHovering = hovered !== null;

  // Menu items hover states
  const home = hoveredMenu === "home";
  const occasion = hoveredMenu === "occasion";
  const offers = hoveredMenu === "offers";
  const generic = hoveredMenu === "generic";

  // Data for different menu items
  const menuData = {
    home: {
      heading: "Home",
      subheading: "Welcome to PresentBox - Your ultimate gift destination",
      img: "https://i.pinimg.com/1200x/c4/5f/f2/c45ff272bfc8cc4ed62f7404f718bf14.jpg",
    },
    offers: {
      heading: "Special Offers",
      subheading: "Get amazing discounts on our premium gift collections",
      img: "https://i.pinimg.com/1200x/da/f2/c7/daf2c7c581b5152fb0722199bd76db21.jpg",
    },
  };

  const menuDatathree = {
    occasion: {
      heading: "Occasions",
      subheading: "Find the perfect gift for every special moment",
      links: ["Birthdays", "Anniversaries", "Weddings", "Graduations"],
      img: "https://i.pinimg.com/1200x/68/a5/03/68a503d245800db249bd5bd751787b89.jpg",
    },
    generic: {
      heading: "Generic Gifts",
      subheading: "Explore our versatile gift options for any occasion",
      links: [
        "Thank You Gifts",
        "Get Well Soon Gifts",
        "Just Because Gifts",
        "Corporate Gifts",
      ],
      img: "https://i.pinimg.com/1200x/7b/ed/1e/7bed1e2f3f5f4f6f4e3e8e8e8e8e8e8e.jpg",
    },
  };

  return (
    <div>
      <HeaderWrapper>
        <Cover
          $active={leftActive}
          $collapsed={isHovering && !leftActive}
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
        >
          <Head>
            <Logo>PresentBox</Logo>
            {!hovered && <RxHamburgerMenu size={20} />}
            {hovered && (
              <Hover
                style={{ marginLeft: "50px" }}
                $active={hoveredMenu === "home"}
                onMouseEnter={() => setHoveredMenu("home")}
              >
                Home
              </Hover>
            )}
            {hovered && (
              <Hover
                $active={hoveredMenu === "occasion"}
                onMouseEnter={() => setHoveredMenu("occasion")}
              >
                Occasions
              </Hover>
            )}
            {hovered && (
              <Hover
                $active={hoveredMenu === "offers"}
                onMouseEnter={() => setHoveredMenu("offers")}
              >
                Offers
              </Hover>
            )}
            {hovered && (
              <Hover
                $active={hoveredMenu === "generic"}
                onMouseEnter={() => setHoveredMenu("generic")}
              >
                Generic
              </Hover>
            )}
          </Head>
          {hovered && home && (
            <Twogrid
              heading={menuData.home.heading}
              subheading={menuData.home.subheading}
              img={menuData.home.img}
            />
          )}
          {hovered && occasion && (
            <Threegrid
              heading={menuDatathree.occasion.heading}
              subheading={menuDatathree.occasion.subheading}
              links={menuDatathree.occasion.links}
              img={menuDatathree.occasion.img}
            />
          )}
          {hovered && offers && (
            <Twogrid
              heading={menuData.offers.heading}
              subheading={menuData.offers.subheading}
              img={menuData.offers.img}
            />
          )}
          {hovered && generic && (
            <Threegrid
              heading={menuDatathree.generic.heading}
              subheading={menuDatathree.generic.subheading}
              links={menuDatathree.generic.links}
              img={menuDatathree.generic.img}
            />
          )}
        </Cover>

        <Cover
          $active={rightActive}
          $collapsed={isHovering && !rightActive}
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
        >
          <IoSearch />
          <IoSearch />
          <IoSearch />
        </Cover>
      </HeaderWrapper>
      {/* <Twogrid /> */}
    </div>
  );
}

export default Header;
