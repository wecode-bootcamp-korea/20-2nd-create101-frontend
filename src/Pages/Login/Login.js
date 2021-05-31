import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';
import { API } from '../../config';
import Modal from '../../Components/Modal/Modal';

function SocialLogin() {
  const { Kakao } = window;
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  const MODAL_CONTENTS = {
    success: (
      <Modal
        color="#FF5704"
        button="확인"
        buttonClick={() => {
          setAlert(false);
          history.push('/');
        }}
      >
        {<>Welcome to Create 101! 🙋</>}
      </Modal>
    ),
    fail: (
      <Modal
        color="#FF5704"
        button="확인"
        buttonClick={() => {
          setAlert(false);
        }}
      >
        {<>로그인에 실패했습니다. 🙅</>}
      </Modal>
    ),
  };

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
              // alert('Welcome to Create 101!');
              // history.push('/');
              setAlert('success');
            }
          });
      },
      fail: function (error) {
        // alert('로그인에 실패했습니다.');
        setAlert('fail');
      },
    });
  };

  const goToMainPage = () => {
    history.push('/');
  };

  return (
    <Container>
      <Main>
        <HeaderBar>
          <Logo alt="로고" src="/images/logo.png" onClick={goToMainPage} />
          <Language>🇰🇷 한국어</Language>
        </HeaderBar>
        <TagContainer>
          <MobileImageContainer>
            <img alt="" src="/images/loginImage.jpg" />
          </MobileImageContainer>
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
        <Image alt="" src="/images/loginImage.jpg" />
      </ImageContainer>
      {alert && MODAL_CONTENTS[alert]}
    </Container>
  );
}

const Container = styled.div`
  @media ${({ theme }) => theme.web} {
    display: grid;
    grid-template-columns: 50% 50%;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 85%;
    margin: auto;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  @media ${({ theme }) => theme.web} {
    justify-content: center;
    width: 50%;
    margin: 0 auto;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
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

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const Logo = styled.img`
  display: flex;
  align-items: center;
  width: 80px;
`;

const Language = styled.div`
  display: flex;
  align-items: center;
`;

const TagContainer = styled.div`
  @media ${({ theme }) => theme.web} {
    margin-bottom: 50px;
  }

  @media ${({ theme }) => theme.mobile} {
    margin-bottom: 30px;
  }
`;

const MobileImageContainer = styled.div`
  @media ${({ theme }) => theme.web} {
    display: none;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
    height: 200px;
    margin: 30px 0;
    overflow: hidden;
  }
`;

const TagLine = styled.div`
  font-weight: bold;

  @media ${({ theme }) => theme.web} {
    font-size: 35px;
    line-height: 44px;
  }

  @media ${({ theme }) => theme.mobile} {
    font-size: 25px;
    line-height: 32px;
  }
`;

const SubTagLine = styled.div`
  color: ${props => props.theme.SubTagLineColor};
  margin-top: 15px;
  line-height: 25px;

  @media ${({ theme }) => theme.mobile} {
    font-size: 16px;
    line-height: 20px;
  }
`;

const LoginButton = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-end;

  @media ${({ theme }) => theme.mobile} {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
`;

export default withRouter(SocialLogin);
