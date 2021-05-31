import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Search } from '@styled-icons/fa-solid';
import { Clock } from '@styled-icons/bootstrap';
import { DeleteOutline } from '@styled-icons/typicons';

function ClickedSearchBar(props) {
  const [searchInput, setSearchInput] = useState();
  const goToSearchResultPage = searchInput => {
    props.history.push(`/category/${searchInput}`);
  };
  const goToSearchKeywordPage = e => {
    props.history.push(`/category/${e.target.textContent}`);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return (
    <ClickedSearch>
      <ClickedSearchBarContainer>
        <ClickedSearchBarInnerContainer>
          <ClickedSearchBarLogo
            alt="ceate101 로고"
            src="/images/logo.png"
            name=""
            onClick={e => {
              props.goToPage(e);
            }}
          />
          <ClickedSearchBox
            onSubmit={e => {
              e.preventDefault();
              props.addLog(e);
              goToSearchResultPage(searchInput);
              props.setClickedSearchBar(false);
            }}
          >
            <ClickedSearchInput
              type="text"
              placeholder="찾으시는 취미가 있으신가요?"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              autoFocus
            />
            <ClickedSearchIconBtn type="submit">
              <ClickedSearchIcon />
            </ClickedSearchIconBtn>
          </ClickedSearchBox>
          <CancelText
            type="button"
            onClick={() => {
              props.setClickedSearchBar(false);
            }}
          >
            취소
          </CancelText>
        </ClickedSearchBarInnerContainer>

        <SearchWordContainer>
          <SearchType>최근 검색어</SearchType>
          <ul>
            {props.searchLog.map(log => (
              <RecentSearchKeywordsContainer key={log.id}>
                {log.word}
                <DeleteIcon
                  onClick={e => {
                    props.delLog(log);
                  }}
                />
              </RecentSearchKeywordsContainer>
            ))}
          </ul>

          <MiddleLineBox />

          <SearchType>추천 검색어</SearchType>
          <div className="RecommendedSearchKeywordsContainer">
            {RecommendedKeywords.map((RecommendedKeyword, idx) => (
              <RecommendedSearchKeyword
                key={idx}
                type="button"
                onClick={e => {
                  goToSearchKeywordPage(e);
                  props.setClickedSearchBar(false);
                }}
              >
                {RecommendedKeyword}
              </RecommendedSearchKeyword>
            ))}
          </div>

          <MiddleLineBox />

          <SearchType>
            인기 검색어
            <ClockIcon />
          </SearchType>
          <div className="popularSearchKeywordsContainer">
            <ul>
              {PopularSearchKeywords.map((PopularSearchKeyword, idx) => (
                <PopularKeyword
                  key={idx}
                  onClick={e => {
                    goToSearchKeywordPage(e);
                    props.setClickedSearchBar(false);
                  }}
                >
                  <span className="popularKeywordNum">{idx + 1}</span>
                  <span className="popularKeywordText">
                    {PopularSearchKeyword}
                  </span>
                </PopularKeyword>
              ))}
            </ul>
          </div>
        </SearchWordContainer>
      </ClickedSearchBarContainer>
    </ClickedSearch>
  );
}

const RecommendedKeywords = [
  '축구',
  '농구',
  '돈까스',
  '투자',
  '프랑스',
  '독일',
];

const PopularSearchKeywords = ['임대차', '골프', '드로잉', '전세'];

const ClickedSearch = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 10;
`;

const ClickedSearchBarContainer = styled.div`
  padding-bottom: 50px;
`;

const ClickedSearchBarInnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  /* width: 100%; */
`;

const ClickedSearchBarLogo = styled.img`
  width: 120px;
  cursor: pointer;
`;

const ClickedSearchBox = styled.form`
  display: flex;
  align-items: center;
`;

const ClickedSearchInput = styled.input`
  width: 600px;
  height: 40px;
  margin-left: 100px;
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

const ClickedSearchIconBtn = styled.button`
  transform: translateX(-50px);
  cursor: pointer;
`;

const ClickedSearchIcon = styled(Search)`
  width: 15px;
`;

const CancelText = styled.button`
  font-size: 14px;
  cursor: pointer;
`;

const SearchWordContainer = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  width: 700px;
`;

//SearchType
const SearchType = styled.p`
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 20px;
`;

const RecentSearchKeywordsContainer = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px 0px 8px 4px;
  font-size: 14px;
`;
const DeleteIcon = styled(DeleteOutline)`
  position: absolute;
  right: 100px;
  width: 20px;
  color: #cacaca;
  cursor: pointer;
`;

const RecommendedSearchKeyword = styled.button`
  border-radius: 25px;
  margin: 8px 4px 0px 0px;
  padding: 8px 16px;
  background-color: rgb(248, 248, 248);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

const MiddleLineBox = styled.hr`
  box-shadow: rgb(248 248 248) 0px -1px 0px inset;
  margin-bottom: 30px;
  border: none;
  height: 30px;
`;

const ClockIcon = styled(Clock)`
  margin-left: 10px;
  width: 14px;
  color: #cacaca;
`;

const PopularKeyword = styled.li`
  font-size: 14px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    font-weight: 700;
  }

  .popularKeywordNum {
    font-weight: 800;
    margin-right: 10px;
    color: ${props => props.theme.orange};
  }
`;

export default withRouter(ClickedSearchBar);
