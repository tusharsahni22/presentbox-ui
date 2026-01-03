import React from 'react'
import styled from 'styled-components'
import { LuArrowUpRight } from "react-icons/lu";
// import { useState } from 'react';


const Div = styled.div`
  display: inline-flex;
  align-items: center;
`;


const Action = styled.button`
  /* margin-right: 8px; */
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  width: fit-content;
`;

const Cover = styled.div`
  display: inline-flex;
  align-items: center;
  /* margin-left: 8px; */
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
 
`;


function CardButtons({cta, color}) {  
  

  return (
    <Div>
              <Action style={{background:color==="Black" ? "#000" : "#fff", color:color==="Black" ? "#fff" : "#000"}}>
                {cta}
              </Action> 
              <Cover style={{background:color==="Black" ? "#000" : "#fff", color:color==="Black" ? "#fff" : "#000"}}>
              <LuArrowUpRight />
              </Cover>
    </Div>
  )
}

export default CardButtons