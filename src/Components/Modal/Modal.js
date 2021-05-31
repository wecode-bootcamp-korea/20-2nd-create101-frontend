import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Modal(props) {
  const { color, button, buttonClick, children } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  });

  return (
    <>
      <Background>
        <Container color={color}>
          <Contents>{children}</Contents>
          {button && (
            <Btn color={color} onClick={buttonClick}>
              {button}
            </Btn>
          )}
        </Container>
      </Background>
    </>
  );
}

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: auto;
  padding: 4% 4% 6% 4%;
  background-color: white;
  border: 3px solid ${props => props.color};
  border-radius: 10px;
  font-weight: 500;
  text-align: center;

  @media ${({ theme }) => theme.web} {
    width: 40%;
    min-height: 40%;
    transform: translateY(50%);
  }

  @media ${({ theme }) => theme.mobile} {
    width: 90%;
    min-height: 30%;
    font-size: 0.8rem;
    transform: translateY(30vh);
  } ;
`;

const Contents = styled.div`
  * {
    margin: auto;
  }
`;

const Btn = styled.button`
  position: absolute;
  bottom: 50px;
  left: 50%;
  width: fit-content;
  min-width: 100px;
  color: white;
  background-color: ${props => props.color};
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transform: translateX(-50%);

  @media ${({ theme }) => theme.web} {
    padding: 17px;
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 7px;
    font-size: 0.8rem;
  }
`;

export default Modal;
