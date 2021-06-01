import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClassCard from '../../Components/ClassCard/ClassCard';
import { API } from '../../config';

function MyPage(props) {
  const [userData, setUserData] = useState();
  const [courseData, setCourseData] = useState();

  useEffect(() => {
    fetch('/data/user.json')
      // fetch('http://10.58.5.232:8000/users/me', {
      //   headers: {
      //     Authorization: localStorage.getItem('access_token'),
      //   },
      // })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        setUserData(data.user_info);
        setCourseData(data.user_course);
      });
  }, []);

  return (
    <Container>
      <Aside>
        <Large>{userData?.name} 님</Large>
        <Small>{userData?.email}</Small>
        <Medium color={({ theme }) => theme.orange}>🖍 이달의 등급</Medium>
        <Level>
          Lv. Amateur
          <Line />
          <Small>10,000p 추가 적립시 다음달 Lv.Professional</Small>
        </Level>
        <Medium color={({ theme }) => theme.pink}>🎟 나의 쿠폰</Medium>
        {userData?.coupon_list.map((coupon, index) => (
          <Coupon>
            {coupon}
            <CouponLine />
            <Circle left />
            <Circle right />
            <Small>사용기한: 2021.06.30</Small>
          </Coupon>
        ))}
      </Aside>
      <Contents>
        <Box>
          <Large>👀 내가 본 클래스</Large>
          <ClassList>
            {courseData?.looked_list.map(course => (
              <ClassCard componentData={course} key={course.id} />
            ))}
          </ClassList>
        </Box>
        <Box>
          <Large>🧡 내가 찜한 클래스</Large>
          <ClassList>
            {courseData?.liked_list.map(course => (
              <ClassCard componentData={course} key={course.id} />
            ))}
          </ClassList>
        </Box>
        <Box>
          <Large>👩‍🏫 내가 만든 클래스</Large>
          <ClassList>
            {courseData?.user_craete_course.map(course => (
              <ClassCard componentData={course} key={course.id} />
            ))}
          </ClassList>
        </Box>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 1200px;
  margin: auto;

  @media ${({ theme }) => theme.mobile} {
    flex-direction: column;
    width: fit-content;
  }
`;

const Aside = styled.div`
  min-width: 300px;
  font-weight: 500;
  line-height: 2;

  @media ${({ theme }) => theme.mobile} {
    margin: auto;
  }
`;

const Large = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Medium = styled.div`
  margin: 10px 0;
  color: ${props => props.color};
  font-weight: 600;
`;

const Level = styled.div`
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.orange};
  color: white;
`;

const Line = styled.hr`
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid white;
`;

const Small = styled.div`
  font-size: 0.6rem;
`;

const Coupon = styled(Level)`
  position: relative;
  padding: 5px 10px 15px 10px;
  margin: 5px 0;
  background-color: ${({ theme }) => theme.pink};
`;

const CouponLine = styled.hr`
  border: none;
  border-bottom: 1px dashed white;
`;

const Circle = styled.div`
  position: absolute;
  left: ${props => props.left && '-6px'};
  right: ${props => props.right && '-6px'};
  top: 46%;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
`;

const Contents = styled.div`
  width: 900px;
  margin: auto;
  padding: 5px;
`;

const Box = styled.div`
  margin: 50px 0;
`;

const ClassList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyPage;
