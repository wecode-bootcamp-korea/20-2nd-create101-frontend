import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import ClickedSearchBar from './Components/ClickedSearchBar/ClickedSearchBar';
import { Search } from '@styled-icons/fa-solid';
import { ArrowDown } from '@styled-icons/evaicons-solid';
import { API } from '../../../src/config';

function Nav(props) {
  const [categoryDatas, setCategoryDatas] = useState();
  const [onMouseBigCategory, setOnMouseBigCategory] = useState(false);
  const [onMouseSubCategory, setOnMouseSubCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [clickedSearchBar, setClickedSearchBar] = useState(false);
  const [searchLog, setSearchLog] = useState(
    JSON.parse(localStorage.getItem('search log')) || []
  );
  const [login, setLogin] = useState('로그인');
  const location = useLocation().pathname;

  useEffect(() => {
    fetch(`${API}/courses/category`)
      .then(res => res.json())
      .then(data => setCategoryDatas(data.category));
  }, []);

  useEffect(() => {
    localStorage.setItem('search log', JSON.stringify(searchLog));
  }, [searchLog]);

  useEffect(() => {
    if (localStorage.getItem('kakao_4bc6915671ecc50762f3c678ed51a503')) {
      setLogin('로그아웃');
    } else {
      setLogin('로그인');
    }
  }, [login]);

  const handleLogin = () => {
    if (login === '로그인') {
      props.history.push(`/login`);
    } else {
      localStorage.removeItem('kakao_4bc6915671ecc50762f3c678ed51a503');
      setLogin('로그인');
    }
  };

  const addLog = e => {
    setSearchLog([...searchLog, { id: Date.now(), word: e.target[0].value }]);
    e.target[0].value = '';
  };
  const delLog = log => {
    setSearchLog(searchLog.filter(logToDel => logToDel.id !== log.id));
  };

  const goToPage = e => {
    e.target.name
      ? props.history.push(`/${e.target.name}`)
      : props.history.push(`/category/${e.target.textContent}`);
  };

  return location !== '/login' ? (
    <WebNav>
      {!clickedSearchBar && (
        <div className="SearchOutContainer">
          <SearchInnerContainer>
            <Logo
              alt="ceate101 로고"
              src="/images/logo.png"
              name=""
              onClick={() => props.history.push('/')}
            />
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="찾으시는 취미가 있으신가요?"
                onClick={() => {
                  setClickedSearchBar(true);
                }}
              ></SearchInput>
              <SearchIconBtn type="submit">
                <SearchIcon />
              </SearchIconBtn>
            </SearchBox>
            <LoginText onClick={handleLogin}>{login}</LoginText>
            <MypageText name="mypage" onClick={e => goToPage(e)}>
              마이 페이지
            </MypageText>
          </SearchInnerContainer>
        </div>
      )}

      {/* ClickedSearchBar 컴포넌트 */}
      {clickedSearchBar && (
        <ClickedSearchBar
          clickedSearchBar={clickedSearchBar}
          setClickedSearchBar={setClickedSearchBar}
          searchLog={searchLog}
          setSearchLog={setSearchLog}
          addLog={addLog}
          delLog={delLog}
          goToPage={goToPage}
        />
      )}

      <div className="NavOutContainer">
        <NavInnerContainer>
          <TotalCategory
            onMouseEnter={() => {
              setOnMouseBigCategory(true);
            }}
            onMouseLeave={() => {
              setOnMouseBigCategory(false);
            }}
            border={onMouseBigCategory}
          >
            전체 카테고리
            <ArrowDownIcon />
          </TotalCategory>
          <MakeClass name="create" onClick={e => goToPage(e)}>
            클래스 생성하기
          </MakeClass>
        </NavInnerContainer>
      </div>

      {/* NavDropDown*/}
      <div className="DropDownContainer">
        <div
          className="DropDownInnerContainer"
          onMouseEnter={() => {
            setOnMouseBigCategory(true);
          }}
          onMouseLeave={() => {
            setOnMouseBigCategory(false);
          }}
        >
          {onMouseBigCategory && (
            <NavDropDownInnerBox>
              <div>
                <CategoryInnerContainer>
                  {categoryDatas.map((categoryData, idx) => (
                    <ul>
                      <CategoryList
                        key={idx}
                        onMouseEnter={() => {
                          setOnMouseSubCategory(true);
                          setSelectedCategory(categoryData);
                        }}
                        onClick={e => goToPage(e)}
                      >
                        {categoryData.name}
                      </CategoryList>
                    </ul>
                  ))}
                </CategoryInnerContainer>
              </div>
              <div
                className="navDropDownSub"
                onMouseLeave={() => {
                  setOnMouseSubCategory(false);
                }}
              >
                {selectedCategory && onMouseSubCategory && (
                  <div className="subCategory">
                    <CategoryInnerContainer>
                      <ul>
                        {selectedCategory.sub_category.map(subCategory => (
                          <CategoryList
                            key={subCategory.id}
                            onClick={e => goToPage(e)}
                          >
                            {subCategory.name}
                          </CategoryList>
                        ))}
                      </ul>
                    </CategoryInnerContainer>
                  </div>
                )}
              </div>
            </NavDropDownInnerBox>
          )}
        </div>
      </div>
    </WebNav>
  ) : null;
}

const WebNav = styled.div`
  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const SearchInnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
`;

const Logo = styled.img`
  width: 120px;
  cursor: pointer;
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;
  margin-left: 20px;
  padding: 12px;
  border: none;
  border-radius: 30px;
  background-color: #f7f7f8;

  &::placeholder {
    font-size: 12px;
  }

  &:focus {
    outline: none;
  }
`;

const SearchIconBtn = styled.button`
  transform: translateX(-50px);
  cursor: pointer;
`;

const SearchIcon = styled(Search)`
  width: 15px;
`;

const LoginText = styled.span`
  position: absolute;
  right: 20%;
  font-size: 14px;
  cursor: pointer;
`;

const MypageText = styled.span`
  position: absolute;
  right: 25%;
  font-size: 14px;
  cursor: pointer;
`;

const NavInnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 1200px;
`;

const TotalCategory = styled.button`
  font-size: 16px;
  margin-left: 10px;
  padding: 8px 0 20px 0;
  cursor: pointer;
  ${props => props.border && 'border-bottom: 3px solid black;'}
`;

const ArrowDownIcon = styled(ArrowDown)`
  width: 20px;
`;

const MakeClass = styled.button`
  font-size: 14px;
  margin-left: 50px;
  padding: 8px 0 20px 0;
  cursor: pointer;

  &:hover {
    border-bottom: 3px solid black;
  }
`;

//NavDropDown
const NavDropDownInnerBox = styled.div`
  display: inline-flex;
  position: absolute;
  z-index: 10;
  background-color: white;
  left: 15%;
`;

const CategoryInnerContainer = styled.div`
  width: 200px;
  height: 300px;
  padding: 20px;
  border: 1px solid rgb(239, 239, 239);
`;

const CategoryList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 2.5;
  font-size: 17px;
  cursor: pointer;
`;

export default withRouter(Nav);
