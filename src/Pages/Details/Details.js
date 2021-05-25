import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Heart, ShareApple } from '@styled-icons/evil';
import { Person } from '@styled-icons/bootstrap';
import QnA from './QnA/QnA';

function Details() {
  const tabRef = useRef([]);
  const [currentTab, setCurrentTab] = useState();

  useEffect(() => {
    setCurrentTab(tabRef.current[0]);
    const tabObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentTab(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    tabRef.current.forEach(tab => tabObserver.observe(tab));

    return () => tabObserver.disconnect();
  }, []);

  return (
    <Container>
      <Contents width={780}>
        <Thumbnail />
        <AsideMobile>{asideContents}</AsideMobile>
        <Tabs>
          {TABDATA.map((data, index) => (
            <Tab
              onClick={() => {
                tabRef.current[index].scrollIntoView();
                setCurrentTab(tabRef.current[index]);
              }}
              selected={tabRef.current[index] === currentTab}
            >
              {data}
            </Tab>
          ))}
        </Tabs>
        <TabContents ref={ref => (tabRef.current[0] = ref)}>
          <img alt="detail info" src={detailImg} />
        </TabContents>
        <TabContents ref={ref => (tabRef.current[1] = ref)} padding>
          <QnA />
        </TabContents>
        <TabContents ref={ref => (tabRef.current[2] = ref)} padding>
          <P size={1.25} bold>
            환불 정책
          </P>
          <Contents bgColor={'#f3f3f3'} padding={40}>
            <P size={0.8}>
              환불 정책에 따라 구매일로부터 90일까지 환불 요청이 가능하며, 7일
              까지 전액 환불이 가능합니다.
            </P>
          </Contents>
        </TabContents>
      </Contents>
      <Aside>{asideContents}</Aside>
    </Container>
  );
}

const TABDATA = ['클래스 소개', '커뮤니티', '환불 정책'];
const detailImg = '/images/detail1.png';

const Container = styled.div`
  display: flex;
  width: 1200px;
  margin: 50px auto;

  @media ${({ theme }) => theme.mobile} {
    flex-direction: column;
  }
`;

const Contents = styled.div`
  ${props => `width: ${props.width}px;`}
  ${props => `background-color: ${props.bgColor};`}
  ${props => `padding: ${props.padding}px;`}

  * {
    max-width: 100%;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
`;

const Thumbnail = styled.img`
  width: 100%;

  @media ${({ theme }) => theme.mobile} {
    height: 300px;
  }

  /*지울 속성*/
  height: 500px;
`;

const Tabs = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  font-size: 0.8rem;
  background-color: white;
  z-index: 5;
`;

const Tab = styled.li`
  margin: 15px 15px 0 15px;
  padding-bottom: 15px;
  color: ${props => (props.selected ? 'black' : 'gray')};
  ${props =>
    props.selected && 'border-bottom: 5px solid black; font-weight: bolder'};
  cursor: pointer;
`;

const TabContents = styled.div`
  ${props => props.padding && 'padding: 20px;'}
`;

const Aside = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  width: 360px;
  height: fit-content;
  margin: 0 20px;
  padding: 0 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px lightgray;

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const AsideMobile = styled.div`
  display: none;
  width: 100%;
  padding: 0 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px lightgray;

  @media ${({ theme }) => theme.mobile} {
    display: block;
  }
`;

const Box = styled.div`
  padding: 25px 0;
  ${props => props.line && 'border-bottom: 1px solid #e6e6e6'}
`;

const Span = styled.span`
  ${props =>
    `color: ${props.color}; font-size: ${props.size}rem; font-weight: ${
      props.bold && 'bold'
    }`};
`;

const P = styled.p`
  ${props =>
    `color: ${props.color}; font-size: ${props.size}rem; font-weight: ${
      props.bold && 'bold'
    }`};
  line-height: 2;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  width: ${props => props.width || '100%'};
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  ${props => `color: ${props.color}`};
  background-color: ${props => props.bgColor || '#f3f3f3'};
  font-size: 0.9rem;
  ${props => props.bold && `font-weight: bolder`};
  border-radius: 5px;
  cursor: pointer;
`;

const PersonIcon = styled(Person)`
  width: 20px;
`;

const EmptyHeart = styled(Heart)`
  height: 25px;
`;

const Share = styled(ShareApple)`
  height: 25px;
`;

const asideContents = (
  <>
    <Box line>
      <Span size={0.8}>수익 창출</Span>
      <P bold>주식 투자, 운도 감도 아닌 학습입니다.</P>
    </Box>
    <Box line>
      <PersonIcon />
      <Span size={0.8}>입문자 대상</Span>
    </Box>
    <Box>
      <FlexBox>
        <Btn width={'48%'}>
          <EmptyHeart />
          12304
        </Btn>
        <Btn width={'48%'}>
          <Share /> 공유하기
        </Btn>
      </FlexBox>
      <Btn color={'white'} bgColor={({ theme }) => theme.orange} bold>
        수강하기
      </Btn>
    </Box>
  </>
);

export default Details;
