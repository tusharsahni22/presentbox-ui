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
`
const ListItem = styled.li`
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
       cursor: pointer;
    }
`
export default function FooterMenuCard({ heading, items = [] }) {
    console.log('FooterMenuCard items:', items, heading);
  return (
    <Wrapper>
      <Heading className='headingColor'>{heading}</Heading>
      <List>
        {items.map((it, idx) => (
            
          <ListItem key={idx}><a href={it.url}>{it.label}</a></ListItem>
        
        ))}
      </List>
    </Wrapper>
  );
}