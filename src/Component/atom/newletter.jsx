import React from 'react';
import styled from 'styled-components'
import { TiTick } from "react-icons/ti";

const NewLetterSection = styled.div`
  /* max-width: 400px; */
  text-align: left;
`;
const NewsletterForm = styled.form`
  display: flex;
  margin-top: 10px;
  align-items: center;
  background: linear-gradient(135deg, #0b0b0b 0%, #2a2a2a 45%, #0f0f0f 100%);
  padding: 20px;
  text-align: center;
  border: none;
  border-radius: 25px;
  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    color: #fff;
    outline: none;
    &:focus {
      outline: none;
      border: none;
    }
  }
`;


const Tick = styled(TiTick)`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

const Newletter = React.memo(({ heading = "Subscribe to our Newsletter", placeholder = "Enter your email", onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Submitted email:", email);
    if (onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <NewLetterSection>
      <h1 className="headingColor">{heading}</h1>
      <NewsletterForm onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder={placeholder} required />
        <SubmitButton type="submit">
          <Tick />
        </SubmitButton>
      </NewsletterForm>
    </NewLetterSection>
  );
});

Newletter.displayName = 'Newletter';

export default Newletter