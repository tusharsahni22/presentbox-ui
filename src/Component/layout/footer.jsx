import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FooterMenuCard from "../atom/footerMenuCard";
import NewLetterCard from "../atom/newletter";
import { API_BASE } from "../../api/config";

const FooterWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: space-around;
  background: linear-gradient(135deg, #0b0b0b 0%, #2a2a2a 45%, #0f0f0f 100%);
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
const Brand = styled.div``;


function Footer() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        console.log("Fetching footer data...", `${API_BASE}/api/footerr`);
        const { data } = await axios.get(`${API_BASE}/api/footerr`, {
          params: { populate: { section: { populate: { item: "*" } } } },
          signal: controller.signal,
        });
        setSections(data?.data || []);
        console.log("Footer data:", data);
      } catch (err) {
        if (!axios.isCancel?.(err)) console.error("Footer load error:", err);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  if (loading) return <footer>Loading…</footer>;

  return (
    <FooterWrapper>
      <Section>
        <Brand>
          <Logo>Footer</Logo>
          <p>© 2026 PresentBox. All rights reserved.</p>
        </Brand>
      </Section>
      <Section className="footer-grid">
        <>
          {sections.section?.map((s, i) => (
            <FooterMenuCard key={i} heading={s.heading} items={s.item} />
          ))}
          {sections.newsletter && <NewLetterCard />}
        </>
      </Section>
    </FooterWrapper>
  );
}

export default Footer;
