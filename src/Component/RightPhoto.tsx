import React from 'react';
import Photo from './Photo';
import RightPhotoArea from '../images/template_scrapbook_2_2_image.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: -70px;
  right: -95px;
  background-image: url(${RightPhotoArea});
  background-repeat: no-repeat;
  background-size: contain;
  width: 320px;
  height: 320px;
  z-index: 1;
`;

const Empty = styled.div`
    border: 2px dashed black;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const UploadArea = styled.div`
    width: calc(100% - 155px);
    height: calc(100% - 107px);
    position: relative;
    top: 53px;
    right: -39px;
    transform: rotateZ(-5deg);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const RightPhoto = () => {
    return (
        <Wrapper>
            <Photo UploadArea={UploadArea} Empty={Empty} />
        </Wrapper>
    );
};

export default RightPhoto;