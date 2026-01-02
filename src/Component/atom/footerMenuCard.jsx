import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
    
`

const Heading = styled.h1`
  margin-bottom: 10px;
`;
const List = styled.ul`
  list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    padding:20px;
    `
const ListItem = styled.li`
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
       cursor: pointer;
    }
`
const Link = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default function FooterMenuCard({ heading, items = [] }) {
  return (
    <Wrapper>
      <Heading className='headingColor'>{heading}</Heading>
      <List>
        {items.map((e) => (
            
          <ListItem key={e.id}><Link href={e.url}>{e.lable}</Link></ListItem>
        
        ))}
      </List>
    </Wrapper>
  );
}