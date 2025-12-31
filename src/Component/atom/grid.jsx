import React from "react";
import styled from "styled-components";
import { LuArrowUpRight } from "react-icons/lu";

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
  gap: 40px;
  margin-top: 10px;
  align-items: start;
`;

const MenuDescription = styled.div`
  padding-right: 12px;
`;

const Heading = styled.h2`
  font-size: 32px;
  margin: 0 0 12px 0;
`;

const Subheading = styled.p`
  font-size: 18px;
  margin: 0;
  opacity: 0.9;
`;

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 16px;

  img {
    width: 100%;
    height: 320px;
    object-fit: cover;
    display: block;
    border-radius: 16px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const LinkRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkAnchor = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

function chunkArray(arr, n) {
  const result = Array.from({ length: n }, () => []);
  if (!Array.isArray(arr) || arr.length === 0) return result;
  arr.forEach((item, i) => result[i % n].push(item));
  return result;
}

// Helper: flatten various shapes into a flat array of link items for single-column menus
function flattenLinksForMenu(links) {
  if (!links) return [];
  if (!Array.isArray(links)) return [];

  // if it's an array of groups like [{ navlinks: [...] }, { navlinks: [...] }]
  if (links.length > 0 && links[0] && typeof links[0] === 'object') {
    // detect navlinks property
    if (Array.isArray(links[0].navlinks)) {
      return links.flatMap((g) => (Array.isArray(g.navlinks) ? g.navlinks : []));
    }
    // detect items property
    if (Array.isArray(links[0].items)) {
      return links.flatMap((g) => (Array.isArray(g.items) ? g.items : []));
    }
  }

  // otherwise it's already a flat array of items
  return links;
}

// Helper: normalize groups into three columns
function normalizeGroupsForThreeColumns(links) {
  if (!links) return [[], [], []];

  // case: array of groups with navlinks or items
  if (Array.isArray(links) && links.length > 0 && links[0] && typeof links[0] === 'object') {
    if (Array.isArray(links[0].navlinks)) {
      return links.map((g) => g.navlinks || []);
    }
    if (Array.isArray(links[0].items)) {
      return links.map((g) => g.items || []);
    }
  }

  // case: nested arrays
  if (Array.isArray(links) && links.length > 0 && Array.isArray(links[0])) {
    // ensure length 3
    const out = [[], [], []];
    for (let i = 0; i < 3; i++) out[i] = links[i] || [];
    return out;
  }

  // case: flat array -> chunk into 3
  return chunkArray(Array.isArray(links) ? links : [], 3);
}

function getImageUrl(img) {
  if (!img) return null;
  // string URL
  if (typeof img === 'string') return img;

  // Strapi file object
  // support: { url: '/uploads/..' } or formats.medium.url or data.attributes
  const base = import.meta.env.VITE_API_BASE_URL || '';

  const url = img.url || (img.data && (img.data.attributes?.url || img.data.attributes?.formats?.medium?.url)) || img.formats?.medium?.url || img.formats?.small?.url || img.formats?.thumbnail?.url;
  if (!url) return null;
  // if url already absolute
  if (/^https?:\/\//i.test(url)) return url;
  // otherwise prefix base
  return base.replace(/\/$/, '') + url;
}

function Grid({ heading, subheading, links, img, grid }) {
  const template = grid || 'heading_image_image';
  const images = Array.isArray(img) ? img : img ? [img] : [];

  // Prepare data for each layout
  // For menu_item_menu_item_menu_item we expect links to be nested or groups; normalize to groupsOfItems
  const threeCols = normalizeGroupsForThreeColumns(links);
  const flatLinks = flattenLinksForMenu(links);

  return (
    <Div>
      <hr style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 12, marginBottom: 16 }} />

      <GridWrapper $template={template}>
        {/* heading + subheading for first-column layouts */}
        {(template === 'heading_image_image' || template === 'heading_menu_item_image') && (
          <MenuDescription>
            <Heading className="headingColor">{heading}</Heading>
            {subheading && <Subheading>{subheading}</Subheading>}
          </MenuDescription>
        )}

        {/* middle column links for heading_menu_item_image */}
        {template === 'heading_menu_item_image' && (
          <Links>
            {flatLinks.map((item, i) => {
              const label = item?.lable || item?.label || item?.Name || item?.name || String(item || '');
              const href = item?.url || item?.Url || item?.link || item?.path || '#';
              const key = item?.id || item?.key || i;
              return (
                <LinkRow key={key}>
                  <LinkAnchor href={href}>{label}</LinkAnchor>
                  <LuArrowUpRight />
                </LinkRow>
              );
            })}
          </Links>
        )}

        {/* three equal columns of lists */}
        {template === 'menu_item_menu_item_menu_item' && (
          threeCols.map((col, ci) => (
            console.log('Column ', ci, col),
            <div key={ci}>
              <Links>
                {Array.isArray(col) && col.map((item, i) => {
                  const label = item?.lable || item?.label || item?.Name || item?.name || String(item || '');
                  const href = item?.url || item?.Url || item?.link || item?.path || '#';
                  const key = item?.id || item?.key || `${ci}-${i}`;
                  return (
                    <LinkRow key={key}>
                      <LinkAnchor href={href}>{label}</LinkAnchor>
                      <LuArrowUpRight />
                    </LinkRow>
                  );
                })}
              </Links>
            </div>
          ))
        )}

        {/* image(s) on right for both heading_image_image and heading_menu_item_image */}
        {(template === 'heading_image_image' || template === 'heading_menu_item_image') && (
          <ImageWrapper>
            {images[0] ? <img src={getImageUrl(images[0])} alt={heading || 'img'} /> : <div style={{ height: 320, background: 'rgba(255,255,255,0.03)' }} />}
          </ImageWrapper>
        )}
      </GridWrapper>
    </Div>
  );
}

export default Grid;
