import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { API } from '../../config';

const { Kakao } = window;

function SocialLogin() {
  const history = useHistory();

  const KakaoLoginHandler = () => {
    Kakao.Auth.login({
      scope: 'profile, account_email, gender, age_range',
      success: function (response) {
        fetch(`http://10.58.5.232:8000/users/login/kakao`, {
          method: 'post',
          headers: {
            Authorization: response.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res['Authorization']) {
              localStorage.setItem('access_token', res['Authorization']);
              alert('Welcome to Create 101!');
              history.push('/');
            }
          });
      },
      fail: function (error) {
        alert('로그인에 실패했습니다.');
      },
    });
  };

  return (
    <Container>
      <Main>
        <HeaderBar>
          <Logo alt="" src="/images/logo.png" />
          <Language>🇰🇷 한국어</Language>
        </HeaderBar>
        <TagContainer>
          <TagLine>
            새로운 삶을 시작하는
            <br />
            온라인 클래스
          </TagLine>
          <SubTagLine>
            가벼운 시작으로 무거운 통장까지
            <br />
            부업, 창업, 제테크도 가볍게 시작해보세요.
          </SubTagLine>
        </TagContainer>
        <LoginButton
          alt=""
          src="/images/kakaoButton.png"
          onClick={KakaoLoginHandler}
        />
      </Main>
      <ImageContainer>
        <Image alt="" src="/images/loginImage.jpg"></Image>
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;
  width: 50%;
  position: relative;
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 80px;
  margin: auto;
  margin-bottom: 200px;
`;

const Logo = styled.img`
  display: flex;
  align-items: center;
  width: 50px;
`;

const Language = styled.div`
  display: flex;
  align-items: center;
`;

const TagContainer = styled.div`
  margin-bottom: 50px;
`;

const TagLine = styled.div`
  font-weight: bold;
  font-size: 35px;
  line-height: 44px;
`;

const SubTagLine = styled.div`
  color: ${props => props.theme.SubTagLineColor};
  margin-top: 15px;
  line-height: 25px;
`;

const LoginButton = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.img`
  width: 100%;
`;

export default SocialLogin;
