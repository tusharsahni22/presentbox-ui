import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Grid from "../atom/grid";
import axios from "axios";
import { API_BASE } from "../../api/config";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  padding: 0 64px;
  top: 63px;
  width: 100%;
  position: fixed;
  z-index: 1000;
`;

const Hover = styled.div`
  font-size: 20px;
  font-weight: 400;
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
  height: 50px;
  align-items: center;
`;

const SearchIcon = styled(IoSearch)`
  cursor: pointer;
  /* transition: all 0.3s ease; */
  padding: 7px;
  font-size: 44px;
  size: 35px;
  &:hover {
    /* transform: rotate(15deg); */
    background-color: #454543;
    border-radius: 50%;
  }
`;

const Logo = styled.div`
  font-family: "BBH Bartle", sans-serif;
  font-weight: 400;
  font-size: 16px;
`;

// Search Modal Styles
const SearchOverlay = styled.div`
  background: #3b3b3b;
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  padding: 10px 5px;
  border-radius: 12px;

  z-index: 5000;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 20px;
  width: 100%;
  padding: 0px 30px;

  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #ffffff;
  }

  &:focus {
    border-bottom-color: rgba(255, 255, 255, 0.8);
  }
`;

// Left cover: primary menu area (darker, expands on hover)
const CoverLeft = styled.div`
  display: ${({ $isHidden }) => ($isHidden ? "none" : "flex")};
  gap: 1rem;
  align-items: center;
  padding: 10px 20px;
  width: fit-content;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 32px;
  border: none;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.06);
  color: #ffffff;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(
      155deg,
      #000000 0%,
      #050505f0 90%,
      #000000 100%
    );
    min-height: 60vh;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 48px 60px 48px 60px;
  }
`;

// Right cover: search/utility area (lighter, different layout)
const CoverRight = styled.div`
  display: ${({ $isHidden }) => ($isHidden ? "none" : "flex")};
  gap: 5px;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  width: fit-content;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 32px;
  height: 70px;
  min-width: 100px;
  border: none;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.06);
  color: #ffffff;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 2;
  align-self: flex-end;

  ${({ $expanded }) =>
    $expanded
      ? `
    background: linear-gradient(155deg, rgba(0, 0, 0, 0.95) 0%, rgba(5, 5, 5, 0.94) 90%, rgba(0, 0, 0, 0.95) 100%);
    padding: 10px 20px;
    gap: 30px;
    border-radius: 32px;
    flex-items: flex-start;
    width: 100%;
    padding: 10px 20px;
  `
      : ``};
`;

const Div = styled.div`
  padding: 7px;
  gap: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    padding: 7px;
    height: 40px;
    width: fit-content;
    /* justify-content: center; */
    /* align-items: center; */
  }
`;
const SignIn = styled.div`
  font-size: 14px;
  font-weight: 400;
  min-width: 50px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;

  &:hover {
    color: #d32f2f;
  }
`;

const SearchHere = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  font-size: 14px;
  font-weight: 400;
  padding: 7px;
`;

function Header() {
  const navigate = useNavigate();
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [hoveredMenuName, setHoveredMenuName] = useState(null);
  const [MENU, setMENU] = useState([]);
  const rightRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMenu = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/headers`, {
          params: {
            "populate[menuDescription]": true,
            "populate[img]": true,
            "populate[navlink][populate][navlinks]": true,
          },
          signal: controller.signal,
        });

        console.log("Header menu data:", data);
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
          setHoveredMenuName(items[0].name);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to load menu", error);
        }
      }
    };

    fetchMenu();

    const handleClickOutside = (e) => {
      if (rightRef.current && !rightRef.current.contains(e.target)) {
        setIsRightHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      controller.abort();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeMenu = hoveredMenuName
    ? MENU.find((m) => m.name === hoveredMenuName)
    : null;

  return (
    <div>
      <HeaderWrapper>
        <CoverLeft
          $isHidden={isRightHovered}
          onMouseEnter={() => {
            setIsLeftHovered(true);
            setIsRightHovered(false);
          }}
          onMouseLeave={() => setIsLeftHovered(false)}
        >
          <Head>
            <Logo>PresentBox</Logo>
            {!isLeftHovered && <RxHamburgerMenu size={22} />}

            {isLeftHovered &&
              Array.isArray(MENU) &&
              MENU.map((e) => (
                <Hover
                  key={e.key}
                  style={{ marginLeft: "50px" }}
                  $active={hoveredMenuName === e.name}
                  onMouseEnter={() => setHoveredMenuName(e.name)}
                >
                  {e.name}
                </Hover>
              ))}
          </Head>
          {isLeftHovered && hoveredMenuName && activeMenu && (
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
          ref={rightRef}
          $isHidden={isLeftHovered}
          $expanded={isRightHovered}
          // onMouseLeave={() => setIsRightHovered(false)}
        >
          <div style={{ display: "flex" }}>
            <SearchIcon
              onClick={(e) => {
                e.stopPropagation(); // prevent outside click trigger
                setIsRightHovered(true);
                setIsLeftHovered(false);
              }}
            />
            {isRightHovered && <SearchHere>Explore Gifts</SearchHere>}
          </div>
          {isRightHovered && (
            <SearchOverlay>
              <SearchInput placeholder="Search..." />
            </SearchOverlay>
          )}

          <Div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
            onClick={() => navigate("/auth")}
          >
            <FaRegUserCircle size={25} />
            <SignIn>Sign in</SignIn>
          </Div>
        </CoverRight>
      </HeaderWrapper>
    </div>
  );
}

export default Header;
