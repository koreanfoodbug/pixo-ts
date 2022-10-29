import React from 'react';
import './App.css';
import styled from 'styled-components';
import ShadowBackground from './images/template_scrapbook_2_1_blending_multiply.png';
import Background from './images/template_scrapbook_2_3_image-x.png';
import LeftPhoto from './Component/LeftPhoto';
import RightPhoto from './Component/RightPhoto';
import TextEditor from './Component/TextEditor/TextEditor';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${ShadowBackground});
  width: 335px;
  height: 596px;
  opacity: 0.5;
`;

const Editor = styled.div`
  width: 335px;
  height: 596px;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

function App() {
  return (
    <>
      <Wrapper>
        <Editor>
          <Shadow />
          <TextEditor top={130} fontSize={40} right={25} initialText="SUMMER" />
          <TextEditor top={106} fontSize={20} right={43} initialText="2020" />
          <LeftPhoto />
          <RightPhoto />
        </Editor>
      </Wrapper>
    </>
  );
}

export default App;
