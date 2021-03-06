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
        button="νμΈ"
        buttonClick={() => {
          setAlert(false);
          history.push('/');
        }}
      >
        {<>Welcome to Create 101! π</>}
      </Modal>
    ),
    fail: (
      <Modal
        color="#FF5704"
        button="νμΈ"
        buttonClick={() => {
          setAlert(false);
        }}
      >
        {<>λ‘κ·ΈμΈμ μ€ν¨νμ΅λλ€. π</>}
      </Modal>
    ),
  };

  const KakaoLoginHandler = () => {
    Kakao.Auth.login({
      scope: 'profile, account_email, gender, age_range',
      success: function (response) {
        fetch(`${API}/users/login/kakao`, {
          // fetch(`http://10.58.5.232:8000/users/login/kakao`, {
          method: 'POST',
          headers: {
            Authorization: response.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res['Authorization']) {
              localStorage.setItem('access_token', res['Authorization']);
              setAlert('success');
            }
          });
      },
      fail: function (error) {
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
          <Logo alt="λ‘κ³ " src="/images/logo.png" onClick={goToMainPage} />
          <Language>π°π· νκ΅­μ΄</Language>
        </HeaderBar>
        <TagContainer>
          <MobileImageContainer>
            <img alt="" src="/images/loginImage.jpg" />
          </MobileImageContainer>
          <TagLine>
            μλ‘μ΄ μΆμ μμνλ
            <br />
            μ¨λΌμΈ ν΄λμ€
          </TagLine>
          <SubTagLine>
            κ°λ²Όμ΄ μμμΌλ‘ λ¬΄κ±°μ΄ ν΅μ₯κΉμ§
            <br />
            λΆμ, μ°½μ, μ νν¬λ κ°λ³κ² μμν΄λ³΄μΈμ.
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
