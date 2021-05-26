import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClassCard from './ClassCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const settings = {
  dots: false,
  lazyLoad: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function CardList(props) {
  const [componentDatas, setComponentDatas] = useState();

  useEffect(() => {
    fetch('/data/componentData.json')
      .then(res => res.json())
      .then(data => {
        setComponentDatas(data.courses);
      });
  }, []);

  return componentDatas ? (
    <MainContainer>
      <CardListContainer>
        <HeaderContainer>
          <div>&nbsp;실시간 TOP10 클래스</div>
        </HeaderContainer>
        <Wrap>
          <StyledSlider {...settings}>
            {componentDatas.map((componentData, index) => {
              return <ClassCard componentData={componentData} key={index} />;
            })}
          </StyledSlider>
        </Wrap>
      </CardListContainer>
    </MainContainer>
  ) : null;
}

const StyledSlider = styled(Slider)`
  .slick-prev:before {
    opacity: 1;
    color: ${props => props.theme.classComponentLightGrey};
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: ${props => props.theme.classComponentLightGrey};
  }
`;

const MainContainer = styled.div`
  width: 85%;
  margin: auto;
`;

const CardListContainer = styled.div`
  position: relative;
  width: 95%;
  margin: auto;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  font-size: 25px;
  font-weight: bold;
  margin: auto;
  position: absolute;
`;

const Wrap = styled.div`
  width: 100%;
  margin: auto;
`;

export default CardList;
