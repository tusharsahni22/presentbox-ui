import styled from "styled-components";
import { LuArrowUpRight } from "react-icons/lu";
import Line from "./line";

const Div = styled.div`
  width: 100%;
`;

const gridMap = {
  heading_menu_item_image: "25% 25% auto",
  heading_image_image: "35% auto",
  menu_item_menu_item_menu_item: "1fr 1fr 1fr",
};

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ $template }) => gridMap[$template] || gridMap.heading_image_image};
  gap: 50px;
  margin-top: 10px;
  align-items: start;
`;

const MenuDescription = styled.div`
  /* padding-right: 12px; */
`;

const Heading = styled.h2`
font-size: 40px;
line-height: 48px;   /* 1.2 */
font-weight: 600;
letter-spacing: -0.4px;
margin: 0 0 16px 0;
`;

const Subheading = styled.p`
font-size: 18px;
line-height: 28px;   /* 1.55 */
font-weight: 400;
max-width: 420px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  /* height: 60%; */
  overflow: hidden;
  border-radius: 16px;

  img {
    width: 100%;
    height: 320px;
    object-fit: cover;
    display: block;
    border-radius: 16px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Links = styled.div`
font-size: 16px;
line-height: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-decoration: underline;
  text-underline-offset: 6px;
  &:hover {
    cursor: pointer;
  }
`;

const LinkRow = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const LinkAnchor = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
`;

function chunkArray(arr, n) {
  const result = Array.from({ length: n }, () => []);
  if (!Array.isArray(arr) || arr.length === 0) return result;
  arr.forEach((item, i) => result[i % n].push(item));
  return result;
}

// Helper: flatten various shapes into a flat array of link items for single-column menus
function flattenLinksForMenu(links) {
  if (!Array.isArray(links)) return [];
  const first = links[0];
  return Array.isArray(first?.navlinks) ? links.flatMap((g) => g.navlinks) : Array.isArray(first?.items) ? links.flatMap((g) => g.items) : links;
}

// Helper: normalize groups into three columns
function normalizeGroupsForThreeColumns(links) {
  if (!Array.isArray(links)) return [[], [], []];
  const first = links[0];
  if (Array.isArray(first?.navlinks)) return links.map((g) => g.navlinks || []);
  if (Array.isArray(first?.items)) return links.map((g) => g.items || []);
  if (Array.isArray(first)) return [links[0] || [], links[1] || [], links[2] || []];
  return chunkArray(links, 3);
}

function getImageUrl(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  const base = (import.meta.env.VITE_API_BASE_URL || '');
  const url = img?.url || img?.formats?.medium?.url || img?.formats?.small?.url || img?.formats?.thumbnail?.url || null;
  if (!url) return null;
  return url.startsWith('http') ? url : `${base}${url}`;
}






function Grid({ heading, subheading, links, img, grid }) {
  const template = grid;
  const images = img == null ? [] : [img].flat();
  const threeCols = normalizeGroupsForThreeColumns(links);
  const flatLinks = flattenLinksForMenu(links);

  

  return (
    <Div>
      <Line />
        <Heading className="heading">{heading}</Heading>
      <GridWrapper $template={template}>
        {/* heading + subheading for first-column layouts */}
        {(template === "heading_image_image" ||
          template === "heading_menu_item_image") && (
            <MenuDescription>
              {subheading && <Subheading>{subheading}</Subheading>}
            </MenuDescription>
          )}

        {template === 'heading_menu_item_image' && (
          <Links>
            {flatLinks.map(({ id, lable, url }) => (
              <LinkRow key={id}>
                <LinkAnchor href={url || "#"}>{lable}</LinkAnchor>
                <LuArrowUpRight />
              </LinkRow>
            ))}
          </Links>
        )}

        {/* three equal columns of lists */}
        {template === "menu_item_menu_item_menu_item" &&
          threeCols.map((col) => (
            <div key={col.id}>
              <Links style={{paddingTop:"16px"}}>
                {col.map(({ id, lable, url }) => (
                  <LinkRow key={id}>
                    <LinkAnchor href={url || "#"}>
                      {lable || ""}
                    </LinkAnchor>
                    <LuArrowUpRight />
                  </LinkRow>
                ))}
              </Links>
            </div>
          ))}

        {/* image(s) on right for both heading_image_image and heading_menu_item_image */}
        {(template === "heading_image_image" ||
          template === "heading_menu_item_image") && (
            <ImageWrapper>
              {images[0] ? (
                <img style={{height: "250px"}} src={getImageUrl(images[0])} alt={heading || "img"} />
              ) : (
                <div
                  style={{ height: 320, background: "rgba(255,255,255,0.03)" }}
                />
              )}
            </ImageWrapper>
          )}
      </GridWrapper>
    </Div>
  );
}

export default Grid;
