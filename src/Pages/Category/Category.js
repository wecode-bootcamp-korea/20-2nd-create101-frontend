import { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components/macro';
import CategoryCards from './Components/CategoryCards';
import PageButtons from './Components/PageButtons';
import { API, TEMP_API } from '../../config';

function Category(props) {
  const [categories, setCategories] = useState();
  const [current, setCurrent] = useState();
  const [componentDatas, setComponentDatas] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const categoryName = props.match.params.categoryName;
  const searchKeyword = props.match.params.categoryName;

  useEffect(() => {
    //카테고리 데이터
    fetch(`${API}/courses/category`)
      .then(res => res.json())
      .then(categoryData => {
        setCategories(categoryData.category);
      });
    //전체 데이터
    fetch(`${API}/courses`)
      .then(res => res.json())
      .then(data => {
        setComponentDatas(data.courses);
      });
  }, []);

  useEffect(() => {
    //카테고리 리스트 데이터
    const fetchDestination =
      categoryName.includes('취미') || categoryName.includes('수익창출')
        ? `${API}/courses?category=${categoryName}`
        : `${API}/courses?sub_category=${categoryName}`;
    fetch(fetchDestination)
      .then(res => res.json())
      .then(data => {
        setComponentDatas(data.courses);
      });
  }, [categoryName]);

  useEffect(() => {
    //검색 데이터
    fetch(`${API}/courses?keyword=${searchKeyword}`)
      .then(res => res.json())
      .then(data => {
        setComponentDatas(data.courses);
      });
  }, [searchKeyword]);

  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = componentDatas
    ? componentDatas.slice(indexOfFirstPost, indexOfLastPost)
    : 1;

  const sortList = key => {
    fetch(`${API}/courses?sort=${key}`)
      .then(res => res.json())
      .then(data => {
        setComponentDatas(data.courses);
      });
  };

  return componentDatas ? (
    <Fragment>
      <Container>
        <Aside>
          {categories &&
            categories.map(category => (
              <div key={category.id}>
                <Li
                  bold
                  onClick={e => {
                    setCurrent(category.name);
                    props.history.push(`/category/${e.target.textContent}`);
                  }}
                  selected={current === category.name}
                >
                  {category.name}
                </Li>
                {category.sub_category.map(sub => (
                  <Li
                    key={sub.id}
                    small
                    onClick={e => {
                      setCurrent(sub.name);
                      props.history.push(`/category/${e.target.textContent}`);
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
                <Fragment key={category.id}>
                  <GridItem
                    onClick={e => {
                      setCurrent(category.name);
                      props.history.push(`/category/${e.target.textContent}`);
                    }}
                    selected={current === category.name}
                  >
                    {category.name}
                  </GridItem>
                  {category.sub_category.map(sub => (
                    <GridItem
                      key={sub.id}
                      onClick={e => {
                        setCurrent(sub.name);
                        props.history.push(`/category/${e.target.textContent}`);
                      }}
                      selected={current === sub.name}
                    >
                      {sub.name}
                    </GridItem>
                  ))}
                </Fragment>
              ))}
            <GridItem></GridItem>
          </GridContainer>
        </MobileAside>
        <Inventory>
          <BtnContainer>
            <Btn
              onClick={() => {
                sortList('likes');
              }}
            >
              인기순
            </Btn>
            <Btn
              onClick={() => {
                sortList('lastest');
              }}
            >
              최신순
            </Btn>
            <Btn
              onClick={() => {
                sortList('reviewest');
              }}
            >
              후기 많은 순
            </Btn>
          </BtnContainer>
          <CardContainer>
            <CategoryCards currentPosts={currentPosts} />
          </CardContainer>
          <PageButtons
            componentDatas={componentDatas}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Inventory>
      </Container>
    </Fragment>
  ) : null;
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

const BtnContainer = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  display: flex;
`;

export default Category;
