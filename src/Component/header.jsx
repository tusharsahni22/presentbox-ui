
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";
import Grid from "./atom/grid";

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
     let mounted = true;
     setHoveredMenu("home");
    async function loadMenu() {
      try {
        const res = await fetch("http://localhost:1337/api/headers?populate[MenuDescription]=true&populate[Img]=true&populate[Navlink][populate][navlinks]=true");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();
        const items = (json.data || []).map((e) => {
          // menu description and possible link groups (Navlink / MenuLink)
          const menudescription = e.MenuDescription || {};
          // Accept different possible field names coming from Strapi
          const rawLinks = e.Navlink || e.NavLink || e.Navlinks || e.MenuLink || e.MenuLinks || e.links || [];

          // Keep the image object (Grid component will resolve Strapi file objects)
          const imgObj = e.Img || e.img || null;

          return {
            key: e.id,
            name: e.Name || e.name || `item-${e.id}`,
            heading: menudescription?.Heading || menudescription?.heading || e.Name || e.name || '',
            subheading: menudescription?.Description || menudescription?.description || '',
            // pass the raw links/groups so Grid can handle nested navlinks or flat arrays
            links: Array.isArray(rawLinks) ? rawLinks : [],
            img: imgObj,
            grid: e.grid || 'heading_image_image',
          };
        });

        if (mounted && items.length) {
          setMENU(items);
          setActiveKey((prev) => prev || items[0].key);
        }
      } catch (err) {
        console.error("Failed to load menu", err);
      }
    }

    loadMenu();
    return () => {
      mounted = false;
    };
  }, []);

  const activeMenu = MENU.find((m) => m.name === hoveredMenu);


  return (
    <div>
      <HeaderWrapper>
        <CoverLeft
        $collapsed={hovered && hovered !== "left"}
        $active={hovered === "left"}
        onMouseEnter={() => setHovered("left") }
        onMouseLeave={() => setHovered(null)}>
          <Head>
            <Logo>PresentBox</Logo>
            {!hovered && <RxHamburgerMenu size={22} />}

            {hovered && Array.isArray(MENU) && MENU.map((e) => (
              <Hover key={e.key} style={{ marginLeft: "50px" }}
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