import { Link, withRouter } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { ArrowIosBackOutline } from '@styled-icons/evaicons-outline';
import { ArrowIosForwardOutline } from '@styled-icons/evaicons-outline';

function MainCarousel() {
  const [mainCarouselDatas, setMainCarouselDatas] = useState();
  const [index, setIndex] = useState(0);
  const delay = 4000;

  useEffect(() => {
    fetch('data/mainCarouselData.json')
      .then(res => res.json())
      .then(carouselDatas => setMainCarouselDatas(carouselDatas.courses));
  }, []);

  useEffect(() => {
    setInterval(goToNextIndex, delay);
    return () => clearInterval(goToNextIndex);
  }, [mainCarouselDatas]);

  const goToNextIndex = () => {
    mainCarouselDatas &&
      setIndex(prevIndex =>
        prevIndex === mainCarouselDatas.length - 1 ? 0 : prevIndex + 1
      );
  };

  return mainCarouselDatas ? (
    <Fragment>
      <BlurBackgroundShow>
        <BlurBackgroundImages
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {mainCarouselDatas.map((mainCarouselData, idx) => {
            return (
              <BlurBackground
                key={idx}
                alt="블러배경"
                src={mainCarouselData.thumbnail}
              />
            );
          })}
        </BlurBackgroundImages>
      </BlurBackgroundShow>

      <CarouselContents>
        <ImageShow>
          <SlidingImages
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {mainCarouselDatas.map((mainCarouselData, idx) => {
              return (
                <Image
                  key={idx}
                  alt="클래스이미지"
                  src={mainCarouselData.thumbnail}
                />
              );
            })}
          </SlidingImages>
        </ImageShow>

        <SlidingContents>
          <DescriptionShow>
            <SlidingDescriptions
              style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
            >
              {mainCarouselDatas.map((mainCarouselData, idx) => {
                return (
                  <Description key={idx}>
                    <MainDescription>
                      {mainCarouselData.main_description}
                    </MainDescription>
                    <SubDescription>
                      {mainCarouselData.sub_description}
                    </SubDescription>
                  </Description>
                );
              })}
            </SlidingDescriptions>
          </DescriptionShow>

          <ProgressNavigator>
            <Index>
              <CurrentIndex>{`${index + 1} | `} </CurrentIndex>
              <TotalLength>{`${mainCarouselDatas.length}`}</TotalLength>
            </Index>
            <ProgressBar>
              <CurrentProgress />
            </ProgressBar>
            <div className="ArrowIcons">
              <ArrowLeftBtn
                type="button"
                onClick={() => {
                  index === 0
                    ? setIndex(mainCarouselDatas.length - 1)
                    : setIndex(index - 1);
                }}
              >
                <ArrowLeftIcon />
              </ArrowLeftBtn>
              <ArrowRightBtn
                type="button"
                onClick={() => {
                  index === mainCarouselDatas.length - 1
                    ? setIndex(0)
                    : setIndex(index + 1);
                }}
              >
                <ArrowRightIcon />
              </ArrowRightBtn>
            </div>
          </ProgressNavigator>
        </SlidingContents>
      </CarouselContents>
    </Fragment>
  ) : null;
}

const progress = keyframes`
  from {
  transform: translateX(-100%);
  }
  to {
  transform: translateX(0);
}`;

const BlurBackgroundShow = styled.div`
  margin: 0 auto;
  overflow: hidden;
  max-width: 100%;
`;

const BlurBackgroundImages = styled.div`
  white-space: nowrap;
`;

const BlurBackground = styled.img`
  display: inline-block;
  width: 100%;
  height: 430px;
  filter: blur(6px);

  @media ${({ theme }) => theme.mobile} {
    height: 260px;
  }
`;

const ImageShow = styled.div`
  margin: 0 20px;
  overflow: hidden;
  max-width: 550px;

  @media ${({ theme }) => theme.mobile} {
    height: 200px;
  }
`;

const CarouselContents = styled.div`
  display: flex;
  position: relative;
  bottom: 350px;
  margin: 0 auto;

  @media ${({ theme }) => theme.web} {
    width: fit-content;
    margin-bottom: -320px;
  }

  @media ${({ theme }) => theme.mobile} {
    flex-direction: column;
    bottom: 180px;
    width: 90%;
    margin-bottom: -180px;
  }
`;

const SlidingImages = styled.section`
  white-space: nowrap;
  transition: 1000ms;
`;

const Image = styled.img`
  display: inline-block;
  height: 400px;
  width: 100%;
  object-fit: cover;
`;

const SlidingContents = styled.section`
  overflow: hidden;

  @media ${({ theme }) => theme.web} {
    width: 450px;
    transform: translateY(20px);
  }

  @media ${({ theme }) => theme.mobile} {
    width: 355px;
  }
`;

const DescriptionShow = styled.div`
  margin: 0 auto;
  overflow: hidden;
  max-width: 450px;

  @media ${({ theme }) => theme.mobile} {
    position: absolute;
    top: -50px;
    width: 355px;
  }
`;

const SlidingDescriptions = styled.div`
  white-space: nowrap;
  transition: 1000ms;
`;

const Description = styled.div`
  display: inline-block;

  @media ${({ theme }) => theme.web} {
    width: 450px;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 355px;
  }
`;

const MainDescription = styled.p`
  font-size: 30px;
  font-weight: 700;
  color: white;
  line-height: 1.5;

  @media ${({ theme }) => theme.mobile} {
    font-size: 22px;
  }
`;

const SubDescription = styled.p`
  margin-top: 20px;
  line-height: 1.2;
  color: white;
  overflow: hidden;

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const ProgressNavigator = styled.div`
  display: flex;
  position: absolute;
  bottom: 100px;
  align-items: center;
  font-size: 15px;

  @media ${({ theme }) => theme.mobile} {
    left: 30px;
    width: 85%;
    bottom: 15px;
  }
`;

const Index = styled.span`
  flex-shrink: 0;
`;

const CurrentIndex = styled.span`
  color: white;
`;

const TotalLength = styled.span`
  color: white;
`;

const ProgressBar = styled.div`
  margin: 0 20px;
  width: 300px;
  height: 1px;
  background-color: grey;
  overflow: hidden;

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
`;

const CurrentProgress = styled.div`
  width: 300px;
  height: 1px;
  background-color: white;
  animation: ${progress} 4s;
  animation-iteration-count: infinite;
`;

const ArrowLeftBtn = styled.button`
  margin-right: 10px;
  cursor: pointer;

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const ArrowLeftIcon = styled(ArrowIosBackOutline)`
  width: 23px;
  color: white;
`;

const ArrowRightBtn = styled.button`
  cursor: pointer;

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const ArrowRightIcon = styled(ArrowIosForwardOutline)`
  width: 23px;
  color: white;
`;

export default MainCarousel;
