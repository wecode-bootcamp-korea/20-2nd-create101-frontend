import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClassCard from './ClassCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { API } from '../../config';

function CardList(props) {
  const [newestData, setNewestData] = useState();
  const [popularData, setPopularData] = useState();
  const [mostReviewData, setMostReviewData] = useState();

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(document.body.clientWidth < 768);
    window.addEventListener('resize', () =>
      setMobile(document.body.clientWidth < 768)
    );
    return () => {
      window.removeEventListener('resize', () =>
        setMobile(document.body.clientWidth < 768)
      );
    };
  }, []);

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: mobile ? 2 : 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch(`${API}/courses?sort=lastest`, {
      headers: {
        Authorization: localStorage.getItem('access_token') || '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setNewestData(data.courses.slice(0, 10));
      });

    fetch(`${API}/courses?sort=likes`, {
      headers: {
        Authorization: localStorage.getItem('access_token') || '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setPopularData(data.courses.slice(0, 10));
      });

    fetch(`${API}/courses?sort=reviewest`, {
      headers: {
        Authorization: localStorage.getItem('access_token') || '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setMostReviewData(data.courses.slice(0, 10));
      });
  }, []);

  const LIST_DATA = [
    { title: '✨ 최신 업데이트 클래스', data: newestData },
    { title: '🔥 실시간 인기 클래스', data: popularData },
    { title: '👍 후기가 많은 클래스', data: mostReviewData },
  ];

  return (
    <>
      {LIST_DATA.map((list, index) => {
        return (
          list.data && (
            <MainContainer key={index}>
              <CardListContainer>
                <HeaderContainer>{list.title}</HeaderContainer>
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
    color: lightgray;
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: lightgray;
  }

  @media ${({ theme }) => theme.mobile} {
    .slick-track {
      display: flex;
    }

    .slick-slide {
      margin: 0 4px;
    }
  }
`;

const MainContainer = styled.div`
  width: 1200px;
  margin: 60px auto;
`;

const CardListContainer = styled.div`
  position: relative;
  margin: auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 85%;
  font-size: 25px;
  font-weight: bold;

  @media ${({ theme }) => theme.mobile} {
    margin-left: 20px;
    font-size: 20px;
  }
`;

const Wrap = styled.div`
  margin: auto;

  @media ${({ theme }) => theme.mobile} {
    width: 80%;
  }
`;

export default CardList;
