import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';
import { Cancel, List, PersonOutline } from '@styled-icons/material';
import { CreateNewFolder } from '@styled-icons/material-outlined';
import { PlayVideo } from '@styled-icons/foundation';

function MobileNav(props) {
  const [search, setSearch] = useState(false);
  const [searchLog, setSearchLog] = useState(
    JSON.parse(localStorage.getItem('search log')) || []
  );

  const [currentTab, setCurrentTab] = useState();

  const [categories, setCategories] = useState();

  useEffect(() => {
    fetch('/data/category.json')
      .then(res => res.json())
      .then(categoryData => {
        setCategories(categoryData);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = currentTab === 1 ? 'hidden' : 'unset';
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('search log', JSON.stringify(searchLog));
  }, [searchLog]);

  const addLog = e => {
    e.preventDefault();
    setSearchLog([...searchLog, { id: Date.now(), word: e.target[0].value }]);
    e.target[0].value = '';
  };

  const delLog = log => {
    setSearchLog(searchLog.filter(logToDel => logToDel.id !== log.id));
  };

  return (
    <Container>
      <SignUp>가입만 해도 쿠폰팩 증정! ></SignUp>
      {!search ? (
        <FlexDiv>
          <img alt="create101 logo" src="/images/logo.png" width="60px" />
          <SearchIcon
            onClick={() => {
              setSearch(true);
            }}
          />
        </FlexDiv>
      ) : (
        <>
          <FlexDiv>
            <form
              onSubmit={e => {
                addLog(e);
              }}
            >
              <Input placeholder="찾으시는 취미가 있으신가요?" />
            </form>
            <Span
              onClick={() => {
                setSearch(false);
              }}
            >
              취소
            </Span>
          </FlexDiv>
          <Div>
            <SearchTitle>최근 검색어</SearchTitle>
            {searchLog.map(log => (
              <FlexDiv key={log.id}>
                {log.word}
                <XIcon
                  onClick={() => {
                    delLog(log);
                  }}
                />
              </FlexDiv>
            ))}
          </Div>
          <Div>
            <SearchTitle>추천 검색어</SearchTitle>
            <KeyWordContainer>
              {KEYWORDS.map((keyword, index) => (
                <KeyWord key={index}>{keyword}</KeyWord>
              ))}
            </KeyWordContainer>
          </Div>
        </>
      )}
      <UnderBar>
        {TAB_LISTS.map((tab, index) => (
          <Tab
            key={index}
            onClick={e => {
              setCurrentTab(index);
              setSearch(false);
              window.scrollTo(0, 0);
            }}
            selected={currentTab === index}
          >
            {tab.icon}
            <div>{tab.name}</div>
          </Tab>
        ))}
      </UnderBar>
      {currentTab === 1 && (
        <Menu>
          {categories.map(category => (
            <Div key={category.id}>
              <Category>{category.name}</Category>
              <Line />
              {category.sub_category.map(sub => (
                <Sub key={sub.id}>{sub.name}</Sub>
              ))}
            </Div>
          ))}
        </Menu>
      )}
    </Container>
  );
}

const Container = styled.div`
  @media ${({ theme }) => theme.web} {
    display: none;
  }

  @media ${({ theme }) => theme.mobile} {
    display: block;
  }
`;

const SignUp = styled.div`
  padding: 12px;
  color: white;
  background-color: ${({ theme }) => theme.orange};
  font-size: 0.8rem;
`;

const Div = styled.div`
  padding: 5px;
  color: ${props => props.color};
  background-color: white;
  font-size: 0.8rem;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 20px;
  font-size: 0.8rem;
`;

const SearchIcon = styled(Search)`
  width: 20px;
`;

const Input = styled.input`
  width: 80vw;
  height: 35px;
  margin: 5px;
  padding: 0 20px;
  background-color: #f3f3f3;
  border-radius: 17px;
`;

const Span = styled.span`
  margin: auto;
  color: ${props => props.color};
  font-weight: ${props => props.bold && 'bold'};
`;

const SearchTitle = styled(Div)`
  padding: 15px;
  font-weight: bold;
`;

const KeyWordContainer = styled(FlexDiv)`
  display: flex;
  justify-content: center;
`;

const KeyWord = styled(Input.withComponent('div'))`
  width: fit-content;
  padding: 10px 20px;
  margin: 15px 10px 0 0;
  color: gray;
`;

const XIcon = styled(Cancel)`
  width: 20px;
  color: lightgray;
`;

const Category = styled.div`
  padding: 20px;
  color: #b8b8b8;
  font-size: 1.1rem;
  font-weight: bold;
`;

const Sub = styled.div`
  padding: 15px 25px;
  font-size: 0.9rem;
`;

const UnderBar = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 75px;
  padding-bottom: 8px;
  background-color: white;
  border-top: 1px solid #e6e6e6;
  z-index: 100;
`;

const Tab = styled.div`
  margin: auto;
  color: ${props => (props.selected ? ({ theme }) => theme.orange : '')};
  text-align: center;
  font-size: 0.7rem;
`;

const Video = styled(PlayVideo)`
  width: 35px;
`;

const Create = styled(CreateNewFolder)`
  width: 35px;
`;

const ListIcon = styled(List)`
  width: 35px;
`;

const Person = styled(PersonOutline)`
  width: 35px;
`;

const Menu = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: white;
`;

const Line = styled.hr`
  width: 90%;
  margin: auto;
  border: none;
  border-bottom: 1px solid #e6e6e6;
`;

const TAB_LISTS = [
  { name: '클래스', icon: <Video /> },
  { name: '카테고리', icon: <ListIcon /> },
  { name: 'create', icon: <Create /> },
  { name: '마이페이지', icon: <Person /> },
];

const KEYWORDS = [
  '제테크',
  '어쩌구',
  '추천검색',
  '저쩌구',
  '무슨수업',
  '무슨무슨수업',
];

export default MobileNav;
