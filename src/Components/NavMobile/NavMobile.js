import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';
import { Cancel, List, PersonOutline } from '@styled-icons/material';
import { CreateNewFolder } from '@styled-icons/material-outlined';
import { PlayVideo } from '@styled-icons/foundation';

function NavMobile(props) {
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
    document.body.style.overflow = currentTab === 2 ? 'hidden' : 'unset';
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('search log', JSON.stringify(searchLog));
  }, [searchLog]);

  const addLog = e => {
    setSearchLog([...searchLog, { id: Date.now(), word: e.target[0].value }]);
    e.target[0].value = '';
  };

  const delLog = log => {
    setSearchLog(searchLog.filter(logToDel => logToDel.id !== log.id));
  };

  return (
    <Container>
      <Div padding="12px" color="white" bgColor={({ theme }) => theme.orange}>
        가입만 해도 쿠폰팩 증정! >
      </Div>
      {!search ? (
        <Div padding="5px 20px" flex>
          <img alt="create101 logo" src="/images/logo.png" width="60px" />
          <SearchIcon
            onClick={() => {
              setSearch(true);
            }}
          />
        </Div>
      ) : (
        <>
          <Div padding="5px 15px" flex>
            <form
              onSubmit={e => {
                e.preventDefault();
                addLog(e);
              }}
            >
              <Input placeholder="찾으시는 취미가 있으신가요?" />
            </form>
            <Span
              color="gray"
              onClick={() => {
                setSearch(false);
              }}
            >
              취소
            </Span>
          </Div>
          <Div>
            <Div padding="20px 5px">
              <Span bold>최근 검색어</Span>
            </Div>
            {searchLog.map(log => (
              <Div key={log.id} padding="10px 5px" flex>
                {log.word}
                <XIcon
                  onClick={() => {
                    delLog(log);
                  }}
                />
              </Div>
            ))}
          </Div>
          <Div>
            <Div padding="5px">
              <Span bold>추천 검색어</Span>
            </Div>
            <Div flex>
              {KEYWORDS.map((keyword, index) => (
                <KeyWord key={index}>{keyword}</KeyWord>
              ))}
            </Div>
          </Div>
        </>
      )}
      <UnderBar>
        <Tab
          onClick={e => {
            setCurrentTab(1);
            setSearch(false);
          }}
          selected={currentTab === 1}
        >
          <Video />
          <div>클래스</div>
        </Tab>
        <Tab
          onClick={e => {
            setCurrentTab(2);
            setSearch(false);
            window.scrollTo(0, 0);
          }}
          selected={currentTab === 2}
        >
          <ListIcon />
          <div>카테고리</div>
        </Tab>
        <Tab
          onClick={e => {
            setCurrentTab(3);
            setSearch(false);
          }}
          selected={currentTab === 3}
        >
          <Create />
          <div>create</div>
        </Tab>
        <Tab
          onClick={e => {
            setCurrentTab(4);
            setSearch(false);
          }}
          selected={currentTab === 4}
        >
          <Person />
          <div>마이 페이지</div>
        </Tab>
      </UnderBar>
      {currentTab === 2 && (
        <Menu>
          {categories.map(category => (
            <Div>
              <Div color="#b8b8b8" size="1rem" bold>
                {category.name}
              </Div>
              <Line />
              {category.sub_category.map(sub => (
                <Div size="0.9rem">{sub.name}</Div>
              ))}
            </Div>
          ))}
        </Menu>
      )}
    </Container>
  );
}

const KEYWORDS = [
  '제테크',
  '어쩌구',
  '추천검색',
  '저쩌구',
  '무슨수업',
  '무슨무슨수업',
];

const Container = styled.div`
  display: none;
  width: 100vw;

  @media ${({ theme }) => theme.mobile} {
    display: block;
  }
`;

const Div = styled.div`
  display: ${props => props.flex && 'flex'};
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100vw;
  padding: ${props => props.padding || '15px'};
  color: ${props => props.color};
  background-color: ${props => props.bgColor || 'white'};
  font-size: ${props => props.size || '0.8rem'};
  font-weight: ${props => props.bold && 'bold'};
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

export default NavMobile;
