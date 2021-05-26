import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClassCard from './ClassCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { API } from '../../config';

const settings = {
  dots: false,
  lazyLoad: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function CardList(props) {
  const [newestData, setNewestData] = useState();
  const [popularData, setPopularData] = useState();
  const [mostReviewData, setMostReviewData] = useState();

  useEffect(() => {
    fetch(`${API}/courses?sort=lastest`)
      .then(res => res.json())
      .then(data => {
        setNewestData(data.courses.slice(0, 10));
      });

    fetch(`${API}/courses?sort=likes`)
      .then(res => res.json())
      .then(data => {
        setPopularData(data.courses.slice(0, 10));
      });

    fetch(`${API}/courses?sort=reviewest`)
      .then(res => res.json())
      .then(data => {
        setMostReviewData(data.courses.slice(0, 10));
      });
  }, []);

  const LIST_DATA = [
    { title: '실시간 인기 클래스', data: popularData },
    { title: '최신 업데이트 클래스', data: newestData },
    { title: '후기가 많은 클래스', data: mostReviewData },
  ];

  return (
    <>
      {LIST_DATA.map((list, index) => {
        return (
          list.data && (
            <MainContainer key={index}>
              <CardListContainer>
                <HeaderContainer>
                  <div>&nbsp;{list.title}</div>
                </HeaderContainer>
                <Wrap>
                  <StyledSlider {...settings}>
                    {list.data.map((componentData, index) => {
                      return (
                        <ClassCard key={index} componentData={componentData} />
                      );
                    })}
                  </StyledSlider>
                </Wrap>
              </CardListContainer>
            </MainContainer>
          )
        );
      })}
    </>
  );
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
  width: 75%;
  margin: 45px auto;
`;

const CardListContainer = styled.div`
  position: relative;
  width: 75%;
  margin: auto;
`;

const HeaderContainer = styled.div`
  width: 85%;
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
