import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
position:relative;
width:100%; 
height:100vh;
overflow:hidden;
`;

const Video = styled.video`
position: absolute;
top: 50%;
left: 50%;
min-width: 100%;
min-height: 100%;
width: auto;
height: auto;
z-index: -1;
object-fit: cover;
transform: translate(-50%, -50%);

`;

const Textwrapper = styled.div`
font-family: 'BBH Bartle', sans-serif;
position: relative;
line-height: 1.4;
  letter-spacing: 0.04em;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 50px;
font-weight: 100;
max-width: 150vh;
text-align: left;
z-index: 1;
color: white;
`;
  

function VideoComponent({ src, Text }) {
  return (
     <Background>
  <Video autoPlay muted loop playsinline>
    <source src={src} type="video/mp4" />
  </Video>

  <Textwrapper>
    {Text}
  </Textwrapper>
</Background>
  )
}

export default VideoComponent