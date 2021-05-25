import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Heart, ShareApple } from '@styled-icons/evil';
import { Person } from '@styled-icons/bootstrap';
import { Coupon } from '@styled-icons/boxicons-solid';
import QnA from './QnA/QnA';

function Details() {
  const tabRef = useRef([]);
  const [currentTab, setCurrentTab] = useState();

  const [course, setCourse] = useState();

  const [discounts, setDiscounts] = useState([false, false]);

  useEffect(() => {
    fetch('/data/details.json')
      .then(res => res.json())
      .then(res => {
        setCourse(res.course);
      });
  }, []);

  useEffect(() => {
    const tabObserver = new IntersectionObserver(
      entries => {
        console.log(entries);
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentTab(entry.target);
          }
        });
      },
      { rootMargin: '-10% 0px', threshold: 0.1 }
    );

    tabRef.current.forEach(tab => tabObserver.observe(tab));

    return () => tabObserver.disconnect();
  }, [course]);

  const asideContents = course && (
    <>
      <Box line>
        <span>{course.subcategory}</span>
        <P>{course.name}</P>
      </Box>
      <Box line>
        <PersonIcon />
        <span>{course.target} 대상</span>
      </Box>
      <Box line>
        <FlexBox>
          <span> </span>
          <P>정가 {Number(course.price).toLocaleString()} 원</P>
        </FlexBox>
        <Div>
          <CouponIcon />
          김도은 님이 받으실 수 있는 혜택
        </Div>
        <FlexBox margin={'10px 0'}>
          <Bold>
            <CheckBox
              type="checkbox"
              onChange={() => {
                setDiscounts([!discounts[0], discounts[1]]);
              }}
            />
            {course.month} 개월 할부
          </Bold>
          <Price color={discounts[0] ? ({ theme }) => theme.pink : '#e6e6e6'}>
            월 {Number(course.price / course.month).toLocaleString()} 원
          </Price>
        </FlexBox>
        <FlexBox margin={'10px 0'}>
          <Bold>
            <CheckBox
              type="checkbox"
              onChange={() => {
                setDiscounts([discounts[0], !discounts[1]]);
              }}
            />
            10,000원 쿠폰
          </Bold>
          <Price color={discounts[1] ? ({ theme }) => theme.pink : '#e6e6e6'}>
            월 3,333 원
          </Price>
        </FlexBox>
      </Box>
      <Box>
        <FlexBox>
          <Btn width="48%">
            <EmptyHeart />
            {course.counts_like}
          </Btn>
          <Btn width="48%">
            <Share /> 공유하기
          </Btn>
        </FlexBox>
        <Btn color="white" bgColor={({ theme }) => theme.orange} bold>
          수강하기
        </Btn>
      </Box>
    </>
  );

  return course ? (
    <Container>
      <Contents width={780}>
        <Thumbnail>
          <img alt="class thumbnail" src={course.thumbnail_url} />
        </Thumbnail>
        <AsideMobile>{asideContents}</AsideMobile>
        <Tabs>
          {TABDATA.map((data, index) => (
            <Tab
              key={index}
              onClick={() => {
                tabRef.current[index].scrollIntoView({ behavior: 'smooth' });
                setCurrentTab(tabRef.current[index]);
              }}
              selected={tabRef.current[index] === currentTab}
            >
              {data}
            </Tab>
          ))}
        </Tabs>
        <TabContents ref={ref => (tabRef.current[0] = ref)} firstChild>
          <Info>
            <span>
              <Bold>수강 기간</Bold>
              {course.month}개월 (연장 가능)
            </span>
            <span>
              <Bold>수강 가능일</Bold>바로 수강 가능
            </span>
            <span>
              <Bold>자막 포함 여부</Bold>포함
            </span>
          </Info>
          <img alt="detail info" src={detailImg} />
        </TabContents>
        <TabContents ref={ref => (tabRef.current[1] = ref)}>
          <P top="50px">환불 정책</P>
          <Info>
            환불 정책에 따라 구매일로부터 90일까지 환불 요청이 가능하며, 7일
            까지 전액 환불이 가능합니다.
          </Info>
        </TabContents>
        <TabContents ref={ref => (tabRef.current[2] = ref)}>
          <QnA questions={course.question} answers={course.answer} />
        </TabContents>
      </Contents>
      <Aside>{asideContents}</Aside>
    </Container>
  ) : null;
}

const TABDATA = ['클래스 소개', '환불 정책', 'Q&A'];
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
  * {
    max-width: 100%;
  }

  @media ${({ theme }) => theme.web} {
    width: 780px;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  overflow: hidden;

  @media ${({ theme }) => theme.web} {
    height: 500px;
  }
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
    props.selected && 'border-bottom: 3px solid black; font-weight: bolder'};
  cursor: pointer;
`;

const TabContents = styled.div`
  margin-top: 30px;
  padding: ${props => (props.firstChild ? '30px 0 0 0' : '20px')};
`;

const Aside = styled.div`
  @media ${({ theme }) => theme.web} {
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
    font-size: 0.8rem;
    z-index: 10;
  }

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const AsideMobile = styled.div`
  @media ${({ theme }) => theme.web} {
    display: none;
  }

  @media ${({ theme }) => theme.mobile} {
    display: block;
    width: 100%;
    padding: 0 20px;
    border-radius: 10px;
    box-shadow: 1px 1px 5px lightgray;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 50px;
  background-color: #f3f3f3;
  font-size: 0.8rem;
  line-height: 2;
`;

const Box = styled.div`
  padding: 25px 0;
  border-bottom: ${props => props.line && '1px solid #e6e6e6'};
`;

const Div = styled.div`
  margin: 20px 0;
  font-size: 0.8rem;
`;

const P = styled.p`
  margin-top: ${props => props.top};
  font-size: 1rem;
  font-weight: bold;
  line-height: 2;
`;

const Bold = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

const CheckBox = styled.input`
  margin-right: 10px;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.margin};
`;

const Btn = styled.button`
  width: ${props => props.width || '100%'};
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor || '#f3f3f3'};
  font-size: 0.9rem;
  font-weight: ${props => props.bold && 'bolder'};
  border-radius: 5px;
  cursor: pointer;
`;

const PersonIcon = styled(Person)`
  width: 20px;
`;

const CouponIcon = styled(Coupon)`
  width: 20px;
  margin-right: 10px;
  color: ${({ theme }) => theme.orange};
`;

const Price = styled.span`
  color: ${props => props.color};
  font-size: 1rem;
  font-weight: bolder;
`;

const EmptyHeart = styled(Heart)`
  height: 25px;
`;

const Share = styled(ShareApple)`
  height: 25px;
`;

export default Details;
