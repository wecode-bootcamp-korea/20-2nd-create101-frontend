import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClassCard from '../../Components/ClassCard/ClassCard';
import { API } from '../../config';

function MyPage(props) {
  const [userData, setUserData] = useState();
  const [courseData, setCourseData] = useState();

  useEffect(() => {
    fetch(`${API}/users/me`, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data.user_info);
        setCourseData(data.user_course);
      });
  }, []);

  return (
    <Container>
      <Aside>
        <Large>{userData?.name} λ</Large>
        <Small>{userData?.email}</Small>
        <Medium color={({ theme }) => theme.orange}>π μ΄λ¬μ λ±κΈ</Medium>
        <Level>
          Lv. Amateur
          <Line />
          <Small>10,000p μΆκ° μ λ¦½μ λ€μλ¬ Lv.Professional</Small>
        </Level>
        <Medium color={({ theme }) => theme.pink}>π λμ μΏ ν°</Medium>
        {userData?.coupon_list.map((coupon, index) => (
          <Coupon>
            {coupon}
            <CouponLine />
            <Circle left />
            <Circle right />
            <Small>μ¬μ©κΈ°ν: 2021.06.30</Small>
          </Coupon>
        ))}
      </Aside>
      <Contents>
        <Box>
          <Large>π λ΄κ° λ³Έ ν΄λμ€</Large>
          <ClassList>
            {courseData?.looked_courses.map(course => (
              <ClassCard componentData={course} key={course.id} left />
            ))}
          </ClassList>
        </Box>
        <Box>
          <Large>π§‘ λ΄κ° μ°ν ν΄λμ€</Large>
          <ClassList>
            {courseData?.liked_courses.map(course => (
              <ClassCard componentData={course} key={course.id} left />
            ))}
          </ClassList>
        </Box>
        <Box>
          <Large>π©βπ« λ΄κ° λ§λ  ν΄λμ€</Large>
          <ClassList>
            {courseData?.user_create_courses.map(course => (
              <ClassCard componentData={course} key={course.id} left />
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

  @media ${({ theme }) => theme.mobile} {
    padding: 10px;
  }
`;

const Box = styled.div`
  margin: 50px 0;
`;

const ClassList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export default MyPage;
