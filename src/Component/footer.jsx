import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FooterMenuCard from './atom/footerMenuCard';

const FooterWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: space-around;
     background: linear-gradient(
    135deg,
    #0b0b0b 0%,
    #2a2a2a 45%,
    #0f0f0f 100%
  );
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;
const Section = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;
const Brand = styled.div`
  `;

function Footer() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const ff = {
  "sections": [
    { "heading": "Navigate", "items": [{ "label": "Home", "url": "/x" }, {"label": "About", "url": "/y"}, {"label": "Contact", "url": "/z"} ] },
    { "heading": "Our Policy", "items": [{ "label": "Shipping Policy", "url": "/y" }] },
    { "heading": "Section C", "items": [{ "label": "Z", "url": "/z" }] }
  ]
}

  // useEffect(() => {
  //   async function fetchFooter() {
  //     try {
  //       const res = await fetch('/api/footer'); // or your CMS client call
  //       const json = await res.json();
  //       setSections(json.sections || []);
  //     } catch (err) {
  //       console.error('Footer load error:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchFooter();
  // }, [ff.sections]);
  useEffect(() => {
    // Simulate fetching data
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSections(ff.sections || []);
    setLoading(false);
  }, []);


  if (loading) return <footer>Loading…</footer>;

  return (
    <FooterWrapper>
      <Section>
        <Brand>
        <Logo>Footer</Logo>
        <p>© 2024 Your Company. All rights reserved.</p>
        </Brand>
      </Section>
      <Section className="footer-grid">
        {sections.map((s, i) => (
          <FooterMenuCard key={i} heading={s.heading} items={s.items} />
        ))}
      </Section>
    </FooterWrapper>
  );
}

export default Footer;