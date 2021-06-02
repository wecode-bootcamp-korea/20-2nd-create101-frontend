import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation().pathname;

  return location !== '/login' ? (
    <div>
      <FooterContainer>
        <InfoContainer>
          <SloganContainer>
            <Logo alt="" src="/images/logo.png" />
            <Slogan>
              크리에이트101은 모든 사람이 사랑하는 일을
              <br />
              하며 살 수 있도록 세상을 바꾸고자 합니다.
            </Slogan>
            <Language>🇰🇷 한국어/한국 스토어</Language>
          </SloganContainer>
          <InformationContainer>
            <CompanyContainer>
              <Title>Create 101</Title>
              <div>홈</div>
              <div>For Business</div>
              <div>채용</div>
              <div>도움말</div>
            </CompanyContainer>
            <CreatorContainer>
              <Apply>크리에이터 지원하기</Apply>
              <div>도움말</div>
            </CreatorContainer>
            <div>
              <Customer>고객센터</Customer>
              <div>문의하기</div>
              <Time>오전 10시 ~ 오후 6시 (주말, 공휴일 제외)</Time>
            </div>
          </InformationContainer>
        </InfoContainer>
        <DetailContainer>
          <Location>
            <a>Create101 Korea </a>
            <a> ・ Create101 USA</a>
            <a> ・ Create101 Japan</a>
            <br />
            <a>Instagram</a>
            <a> ・ Youtube</a>
            <a> ・ Facebook</a>
            <a> ・ Naverpost</a>
            <a> ・ Naverblog</a>
            <a> ・ Playstore</a>
            <a> ・ Appstore</a>
          </Location>
          <OtherInfo>
            <a>이용약관</a>
            <a> ・ 개인정보 처리방침</a>
            <a> ・ 정기구독서비스 이용약관</a>
            <a> ・ 환불 정책</a>
            <a> ・ 사업자 정보 확인</a>
            <a> ・ 단체/기업 교육 문의</a>
            <a> ・ 제휴/협력 문의</a>
            <a> ・ PR 관련 문의</a>
          </OtherInfo>
        </DetailContainer>
      </FooterContainer>
    </div>
  ) : null;
}

export default Footer;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const InfoContainer = styled.div`
  display: flex;
  padding-bottom: 40px;
`;

const SloganContainer = styled.div`
  width: 60%;
`;

const InformationContainer = styled.div`
  width: 100%;
  display: flex;
  line-height: 30px;
  font-size: 15px;
`;

const Logo = styled.img`
  width: 70px;
`;

const Slogan = styled.div`
  margin-top: 20px;
  font-size: 15px;
`;

const Language = styled.div`
  margin-top: 20px;
  font-size: 15px;
`;

const CompanyContainer = styled.div`
  width: 33%; ;
`;

const Title = styled.div`
  font-weight: bold;
`;

const CreatorContainer = styled.div`
  width: 33%;
`;

const Apply = styled.div`
  font-weight: bold;
`;

const Customer = styled.div`
  font-weight: bold;
`;

const Time = styled.div`
  color: ${props => props.theme.classComponentGrey};
`;

const DetailContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.classComponentLightGrey}; ;
`;

const Location = styled.div`
  width: 60%;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.classComponentGrey};
`;

const OtherInfo = styled.div`
  width: 100%;
  font-size: 13px;
  color: ${props => props.theme.classComponentGrey};
`;
