import { useState } from 'react';
import styled from 'styled-components/macro';
import { ArrowIosBackOutline } from '@styled-icons/evaicons-outline';
import { ArrowIosForwardOutline } from '@styled-icons/evaicons-outline';

const pageNum = (data, perPge) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / perPge); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

const PageButtons = props => {
  const { componentDatas, postsPerPage, currentPage, setCurrentPage } = props;
  const numberList = pageNum(componentDatas, postsPerPage);
  const listRange =
    currentPage < 3
      ? numberList.slice(0, 5)
      : numberList.slice(currentPage - 3, currentPage + 2);
  return (
    <PageButtonContainer>
      <LeftArrowButton
        onClick={() => {
          currentPage > 1 && setCurrentPage(currentPage - 1);
        }}
      />
      {listRange.map((el, index) => (
        <Button
          key={index}
          onClick={() => {
            setCurrentPage(el);
          }}
          selected={currentPage === el}
        >
          {el}
        </Button>
      ))}
      <RightArrowButton
        onClick={() => {
          currentPage < numberList.length + 1 &&
            setCurrentPage(currentPage + 1);
        }}
      />
    </PageButtonContainer>
  );
};

const PageButtonContainer = styled.div`
  width: 200px;
  height: fit-content;
  color: black;
  display: flex;
  margin: 50px auto;
  letter-spacing: 10px;
  justify-content: center;
`;

const Button = styled.button`
  width: 30px;
  color: ${props => props.selected && 'white'};
  background-color: ${props =>
    props.selected ? ({ theme }) => theme.orange : null};
  border-radius: 15px;
`;

const LeftArrowButton = styled(ArrowIosBackOutline)`
  width: 30px;
`;

const RightArrowButton = styled(ArrowIosForwardOutline)`
  width: 30px;
`;

export default PageButtons;
