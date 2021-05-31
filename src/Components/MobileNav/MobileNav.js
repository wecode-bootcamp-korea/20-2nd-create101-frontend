import { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';
import { Cancel, List, PersonOutline } from '@styled-icons/material';
import { CreateNewFolder } from '@styled-icons/material-outlined';
import { PlayVideo } from '@styled-icons/foundation';
import Modal from '../Modal/Modal';

function MobileNav(props) {
  const [search, setSearch] = useState(false);
  const [searchLog, setSearchLog] = useState(
    JSON.parse(localStorage.getItem('search log')) || []
  );
  const [currentTab, setCurrentTab] = useState();
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState();
  const [searchInput, setSearchInput] = useState();
  const [alert, setAlert] = useState(false);

  const history = useHistory();

  useEffect(() => {
    search
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [search]);

  useEffect(() => {
    fetch('/data/category.json')
      .then(res => res.json())
      .then(categoryData => {
        setCategories(categoryData);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'unset';
  }, [modal]);

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

  const goToCategoryPage = e => {
    setModal(false);
    history.push(`/category/${e.target.textContent}`);
  };

  const goToMainPage = () => {
    setModal(false);
    history.push(`/`);
  };

  const goToSearchResultPage = searchInput => {
    setSearch(false);
    setModal(false);
    history.push(`/category/${searchInput}`);
  };

  const goToSearchKeywordPage = e => {
    setSearch(false);
    setModal(false);
    history.push(`/category/${e.target.textContent}`);
  };

  const TAB_LISTS = [
    {
      name: '클래스',
      icon: <Video />,
      click: () => history.push('/'),
    },
    { name: '카테고리', icon: <ListIcon />, click: () => setModal(!modal) },
    { name: 'create', icon: <Create />, click: () => history.push('/create') },
    {
      name: '마이페이지',
      icon: <Person />,
      click: () =>
        localStorage.getItem('access_token')
          ? history.push('/mypage')
          : setAlert(true),
    },
  ];

  return (
    <Container>
      <SignUp>가입만 해도 쿠폰팩 증정! ></SignUp>
      {!search ? (
        <FlexDiv>
          <img
            alt="create101 logo"
            src="/images/logo.png"
            width="60px"
            onClick={goToMainPage}
          />
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
                goToSearchResultPage(searchInput);
                setSearch(false);
              }}
            >
              <Input
                placeholder="찾으시는 취미가 있으신가요?"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
            </form>
            <Span
              onClick={() => {
                setSearch(false);
              }}
            >
              취소
            </Span>
          </FlexDiv>
          <FullScreen>
            <Div>
              <SearchTitle>최근 검색어</SearchTitle>
              {searchLog.map(log => (
                <FlexDiv
                  key={log.id}
                  onClick={() => {
                    setSearch(false);
                    history.push(`/category/${log.word}`);
                  }}
                >
                  {log.word}
                  <XIcon
                    onClick={e => {
                      e.stopPropagation();
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
                  <KeyWord key={index} onClick={e => goToSearchKeywordPage(e)}>
                    {keyword}
                  </KeyWord>
                ))}
              </KeyWordContainer>
            </Div>
          </FullScreen>
        </>
      )}
      <UnderBar>
        {TAB_LISTS.map((tab, index) => (
          <Tab
            key={index}
            onClick={e => {
              setCurrentTab(index);
              setSearch(false);
              index !== 1 && setModal(false);
              window.scrollTo(0, 0);
              tab.click();
            }}
            selected={currentTab === index}
          >
            {tab.icon}
            <div>{tab.name}</div>
          </Tab>
        ))}
      </UnderBar>
      {modal && (
        <Menu>
          {categories.map(category => (
            <Div key={category.id}>
              <Category onClick={e => goToCategoryPage(e)}>
                {category.name}
              </Category>
              <Line />
              {category.sub_category.map(sub => (
                <Sub key={sub.id} onClick={e => goToCategoryPage(e)}>
                  {sub.name}
                </Sub>
              ))}
            </Div>
          ))}
        </Menu>
      )}
      {alert && (
        <Modal
          color="#FF5704"
          button="확인"
          buttonClick={() => {
            setAlert(false);
            history.push('/login');
          }}
        >
          {<>로그인이 필요한 기능입니다. 💁</>}
        </Modal>
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
  padding: 5px 10px;
  font-size: 0.8rem;
`;

const FullScreen = styled.div`
  background-color: white;
  height: 80vh;
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

const KEYWORDS = ['축구', '농구', '돈까스', '투자', '프랑스', '독일'];

export default withRouter(MobileNav);
