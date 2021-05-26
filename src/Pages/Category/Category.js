import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Category(props) {
  const [categories, setCategories] = useState();

  const [current, setCurrent] = useState();
  //props에서 초기값 받아오기

  useEffect(() => {
    fetch('/data/category.json')
      .then(res => res.json())
      .then(categoryData => {
        setCategories(categoryData);
      });
  }, []);

  return (
    <Container>
      <Aside>
        {categories &&
          categories.map(category => (
            <div key={category.id}>
              <Li
                bold
                onClick={() => {
                  setCurrent(category.name);
                }}
                selected={current === category.name}
              >
                {category.name}
              </Li>
              {category.sub_category.map(sub => (
                <Li
                  key={sub.id}
                  small
                  onClick={() => {
                    setCurrent(sub.name);
                  }}
                  selected={current === sub.name}
                >
                  {sub.name}
                </Li>
              ))}
            </div>
          ))}
      </Aside>
      <MobileAside>
        <GridContainer>
          <GridItem
            onClick={() => setCurrent('전체보기')}
            selected={current === '전체보기'}
          >
            전체 보기
          </GridItem>
          {categories &&
            categories.map(category => (
              <React.Fragment key={category.id}>
                <GridItem
                  onClick={() => setCurrent(category.name)}
                  selected={current === category.name}
                >
                  {category.name}
                </GridItem>
                {category.sub_category.map(sub => (
                  <GridItem
                    key={sub.id}
                    onClick={() => setCurrent(sub.name)}
                    selected={current === sub.name}
                  >
                    {sub.name}
                  </GridItem>
                ))}
              </React.Fragment>
            ))}
          <GridItem></GridItem>
        </GridContainer>
      </MobileAside>
      <Inventory>
        <Btn>인기순</Btn>
        <Btn>최신순</Btn>
        <Btn>후기 많은 순</Btn>
      </Inventory>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: auto;

  @media ${({ theme }) => theme.mobile} {
    flex-direction: column;
  }
`;

const Aside = styled.div`
  width: 200px;

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const MobileAside = styled.div`
  display: none;
  background-color: lightgray;

  @media ${({ theme }) => theme.mobile} {
    display: block;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  place-items: stretch stretch;
  gap: 1px 1px;
  font-size: 0.9rem;
`;

const GridItem = styled.div`
  padding: 25px;
  color: ${props => (props.selected ? ({ theme }) => theme.orange : 'black')};
  background-color: white;
  text-align: center;
`;

const Li = styled.li`
  margin: 20px;
  color: ${props => (props.selected ? ({ theme }) => theme.orange : 'black')};
  ${props => props.bold && 'font-weight: bold;'}
  ${props => props.small && 'font-size: 0.8rem;'}
  cursor: pointer;
`;

const Inventory = styled.div`
  width: 900px;

  /* 지울 */
  height: 100vh;
  background-color: black;
`;

const Btn = styled.button`
  width: 100px;
  height: 40px;
  margin: 10px 5px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
`;

export default Category;
