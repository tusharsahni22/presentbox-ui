import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";
import Grid from "./atom/grid";
import axios from "axios";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  padding: 0 111px;
  top: 63px;
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
  gap: 20px;
  align-items: center;
`;

const Logo = styled.div`
  font-family: "BBH Bartle", sans-serif;
  font-weight: 400;
  font-size: 16px;
`;
// Left cover: primary menu area (darker, expands on hover)
const CoverLeft = styled.div`
  display: ${({ $collapsed }) => ($collapsed ? "none" : "flex")};
  gap: 1rem;
  align-items: center;
  height: 70px;
  padding: 10px 20px;
  width: ${({ $active }) => ($active ? "100%" : "fit-content")};
  overflow: hidden;
  background: rgba(0, 0, 0, 0.85);
  /* background-color: #633535; */
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.06);
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

// Right cover: search/utility area (lighter, different layout)
const CoverRight = styled.div`
  display: ${({ $collapsed }) => ($collapsed ? "none" : "flex")};
  gap: 10px;
  align-items: center;
  height: 48px;
  padding: 8px 14px;
  min-width: 64px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #fff;

  &:hover {
    cursor: pointer;
    height: auto;
    padding: 16px;
    transition: all 0.18s ease-in-out;
    background: rgba(255, 255, 255, 0.08);
  }
`;

function Header() {
  const [hovered, setHovered] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [MENU, setMENU] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    // setHoveredMenu("home");

    const controller = new AbortController();

    const fetchMenu = async () => {
      try {
        const { data } = await axios.get("http://localhost:1337/api/headers", {
          params: {
            "populate[menuDescription]": true,
            "populate[img]": true,
            "populate[navlink][populate][navlinks]": true,
          },
          signal: controller.signal,
        });

        const items =
          data?.data?.map((e) => {
            const menuDescription = e.menuDescription ?? {};
            const navLinks = e.navlink ?? [];

            return {
              key: e.id,
              name: e.name,
              heading: menuDescription.heading ?? "",
              subheading: menuDescription.description ?? "",
              links: navLinks,
              img: e.img ?? null,
              grid: e.grid ?? "heading_image_image",
            };
          }) ?? [];

        if (items.length > 0) {
          setMENU(items);

          // 👇 first item becomes selected menu
          // setSelectedMenu(items[0]);

          // optional if you still need activeKey
          setActiveKey(items[0].key);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to load menu", error);
        }
      }
    };

    fetchMenu();

    return () => controller.abort();
  }, []);

  const activeMenu = MENU.find((m) => m.name === hoveredMenu);

  return (
    <div>
      <HeaderWrapper>
        <CoverLeft
          $collapsed={hovered && hovered !== "left"}
          $active={hovered === "left"}
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
        >
          <Head>
            <Logo>PresentBox</Logo>
            {!hovered && <RxHamburgerMenu size={22} />}

            {hovered &&
              Array.isArray(MENU) &&
              MENU.map((e) => (
                <Hover
                  key={e.key}
                  style={{ marginLeft: "50px" }}
                  $active={hoveredMenu === e.name}
                  onMouseEnter={() => setHoveredMenu(e.name)}
                >
                  {e.name}
                </Hover>
              ))}
          </Head>
          {hovered && hoveredMenu && activeKey && activeMenu && (
            <Grid
              key={activeMenu.key}
              itemKey={activeMenu.key}
              heading={activeMenu.heading}
              subheading={activeMenu.subheading}
              links={activeMenu.links}
              img={activeMenu.img}
              grid={activeMenu.grid}
            />
          )}
        </CoverLeft>

        <CoverRight
          $collapsed={hovered && hovered !== "right"}
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          $active={hovered === "right"}
        >
          <IoSearch />
          <IoSearch />
          <IoSearch />
        </CoverRight>
      </HeaderWrapper>
    </div>
  );
}

export default Header;
