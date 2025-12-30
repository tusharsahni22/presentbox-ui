import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { styled } from "styled-components";
import Twogrid from "./atom/twogrid";
import Threegrid from "./atom/threegrid";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  position: fixed;
  width: 100%;
`;

const Cover = styled.div`
  display: ${({ $collapsed }) => ($collapsed ? "none" : "flex")};
  gap: 12px;
  align-items: center;
  padding: 10px 20px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  color: white;

  &:hover {
    height: 60vh;
    /* flex-direction: column; */
    align-items: flex-start;
    padding: 60px;
  }
`;

const Hover = styled.div`
  padding: 8px 16px;
  border-radius: 25px;
  background: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.2)" : "transparent"};

  &:hover {
    background: rgba(255,255,255,0.2);
    cursor: pointer;
  }
`;

const Logo = styled.div`
  font-size: 16px;
  font-family: "BBH Bartle", sans-serif;
`;

function Header() {
  const [side, setSide] = useState(null); // left | right
  const [activeKey, setActiveKey] = useState("home");

  const MENU = [
  {
    key: "home",
    name: "Home",
    heading: "Home",
    subheading: "Welcome to PresentBox - Your ultimate gift destination",
    grid: "two",
  },
  {
    key: "occasion",
    name: "Occasions",
    heading: "Occasions",
    subheading: "Find the perfect gift for every special moment",
    links: ["Birthdays", "Anniversaries", "Weddings", "Graduations"],
    img: "https://i.pinimg.com/1200x/68/a5/03/68a503d245800db249bd5bd751787b89.jpg",
    grid: "three",
  },
  {
    key: "offers",
    name: "Offers",
    heading: "Special Offers",
    subheading: "Get amazing discounts on our premium gift collections",
    img: "https://i.pinimg.com/1200x/da/f2/c7/daf2c7c581b5152fb0722199bd76db21.jpg",
    grid: "two",
  },
  {
    key: "generic",
    name: "Generic",//req
    heading: "Generic Gifts",//rew
    subheading: "Explore our versatile gift options for any occasion",//req
    links: [
      "Thank You Gifts",
      "Get Well Soon Gifts",
      "Just Because Gifts",
      "Corporate Gifts",
    ],
    img: "https://i.pinimg.com/1200x/7b/ed/1e/7bed1e2f3f5f4f6f4e3e8e8e8e8e8e8e.jpg",
    grid: "three",
  },
];


  const activeMenu = MENU.find((m) => m.key === activeKey);

  return (
    <HeaderWrapper>
      {/* LEFT MENU */}
      <Cover
        $collapsed={side && side !== "left"}
        onMouseEnter={() => setSide("left")}
        onMouseLeave={() => setSide(null)}
      ><div>
        <Logo>PresentBox</Logo>

        {!side && <RxHamburgerMenu size={20} />}

        {side &&
          MENU.map((item) => (
            <Hover
              key={item.key}
              $active={item.key === activeKey}
              onMouseEnter={() => setActiveKey(item.key)}
            >
              {item.name}
            </Hover>
          ))}
          </div>

        {side &&
          activeMenu &&
          (activeMenu.grid === "three" ? (
            <Threegrid {...activeMenu} />
          ) : (
            <Twogrid {...activeMenu} />
          ))}
      </Cover>

      {/* RIGHT SEARCH */}
      <Cover
        $collapsed={side && side !== "right"}
        onMouseEnter={() => setSide("right")}
        onMouseLeave={() => setSide(null)}
      >
        <IoSearch />
      </Cover>
    </HeaderWrapper>
  );
}

export default Header;
