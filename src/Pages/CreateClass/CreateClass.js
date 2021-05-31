import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { titleState, valueState, monthState, priceState } from './state/state';
import { TriangleDown } from '@styled-icons/octicons';
import { AddAPhoto } from '@styled-icons/material';
import { LoaderCircle } from '@styled-icons/boxicons-regular';
import BasicInfo from './Components/BasicInfo/BasicInfo';
import OtherInfo from './Components/OtherInfo/OtherInfo';
import Modal from '../../Components/Modal/Modal';
import { API } from '../../config';

function CreateClass(props) {
  const title = useRecoilValue(titleState);
  const values = useRecoilValue(valueState);
  const month = useRecoilValue(monthState);
  const price = useRecoilValue(priceState);

  const history = useHistory();

  const [contents, setContents] = useState(<BasicInfo />);
  const [thumbnail, setThumbnail] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [loading, setLoading] = useState(false);

  const activeBtn =
    thumbnail &&
    title &&
    values.subCategory &&
    values.target &&
    month.min &&
    price.min;

  const makeClass = () => {
    const classInfo = JSON.stringify({
      title: title,
      sub_category: values.subCategory.id,
      target: values.target.id,
      month: Math.ceil((Number(month.max) + Number(month.min)) / 2),
      price: (Number(price.max) + Number(price.min)) / 2,
    });

    const classData = new FormData();
    classData.append('course', classInfo);
    classData.append('image', thumbnail);

    activeBtn &&
      fetch(`${API}/courses/register`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
        body: classData,
      })
        .then(res => res.json())
        .then(res => {
          res.message === 'SUCCESS' &&
            setTimeout(() => {
              setLoading('created');
            }, 5000);
        });

    activeBtn ? setLoading('ing') : setLoading('required');
  };

  function readURL(e) {
    if (e.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        setPreviewImg(e.target.result);
      };
    }
  }

  const MODAL_CONTENTS = {
    required: (
      <Modal
        color="#e94650"
        button="확인"
        buttonClick={() => {
          setLoading(false);
        }}
      >
        {<>필수 정보를 모두 입력해 주세요. 😥</>}
      </Modal>
    ),

    ing: (
      <Modal color="#e94650">
        {
          <>
            <Loading />
            클래스를 심사하는 중입니다. 잠시만 기다려 주세요.
          </>
        }
      </Modal>
    ),
    created: (
      <Modal
        color="#e94650"
        button="보러가기 👀"
        buttonClick={() => {
          setLoading(false);
          history.push('/');
        }}
      >
        {<>축하합니다. 클래스가 성공적으로 생성되었습니다!🎉</>}
      </Modal>
    ),
  };

  return (
    <Container>
      <Aside>
        <Menu
          onClick={() => {
            setContents(<BasicInfo />);
          }}
          current={contents.type.name === 'BasicInfo'}
        >
          기본 정보 등록
        </Menu>
        <Down />
        <Menu
          onClick={() => {
            setContents(<OtherInfo />);
          }}
          current={contents.type.name === 'OtherInfo'}
        >
          기타 사항 입력
        </Menu>
        <Down />
        <Btn
          onClick={makeClass}
          bgColor={activeBtn ? ({ theme }) => theme.pink : 'lightgray'}
        >
          나만의 클래스 생성
        </Btn>
      </Aside>
      <Contents>{contents}</Contents>
      <PreviewBox>
        <Preview src={previewImg} />
        <Shadow />
        <ImgUploader
          name="thumbnail"
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={e => {
            readURL(e);
            setThumbnail(e.target.files[0]);
          }}
          required
        />
        <label htmlFor="thumbnail">
          <Photo />
        </label>
        <Title size="1.2">{title}</Title>
        <KeywordContainer>
          {Object.values(values).map(
            (value, index) =>
              value.name && <Keyword key={index}>{value.name}</Keyword>
          )}
        </KeywordContainer>
        <InfoContainer>
          {month.min !== 0 && (
            <Info>
              {month.min}-{month.max}개월 과정
            </Info>
          )}
          {price.min !== 0 && (
            <Info>
              ₩ {price.min}-{price.max}
            </Info>
          )}
        </InfoContainer>
      </PreviewBox>
      {loading && MODAL_CONTENTS[loading]}
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  @media ${({ theme }) => theme.web} {
    width: fit-content;
    margin: 20px auto;
  }

  @media ${({ theme }) => theme.mobile} {
    flex-direction: column;
  }
`;

const Aside = styled.div`
  width: 180px;
  margin: 20px auto;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;

  @media ${({ theme }) => theme.mobile} {
    width: 160px;
  }
`;

const Menu = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.lightestGray};
  box-shadow: ${props => props.current && `0 0 0 2px #e94650 inset`};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.lighterGray};
  }

  @media ${({ theme }) => theme.web} {
    padding: 20px;
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 10px;
    font-size: 0.8rem;
    margin: auto;
  }
`;

const Down = styled(TriangleDown)`
  width: 30px;
  color: ${({ theme }) => theme.pink};
`;

const Btn = styled.button`
  display: block;
  width: 100%;
  color: white;
  background-color: ${props => props.bgColor};
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  @media ${({ theme }) => theme.web} {
    padding: 17px;
  }

  @media ${({ theme }) => theme.mobile} {
    padding: 7px;
    font-size: 0.8rem;
  }
`;

const Contents = styled.div`
  width: 700px;
  padding: 50px;

  @media ${({ theme }) => theme.mobile} {
    padding: 25px;
  }
`;

const PreviewBox = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: black;

  @media ${({ theme }) => theme.mobile} {
    height: 600px;
    margin: auto;
  }
`;

const Preview = styled.img`
  width: 360px;
  border-radius: 10px;

  @media ${({ theme }) => theme.web} {
    height: 640px;
  }

  @media ${({ theme }) => theme.mobile} {
    max-width: 90vw;
    height: 600px;
  }
`;

const Shadow = styled(Preview.withComponent('div'))`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
`;

const ImgUploader = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.transparent};

  &::file-selector-button {
    display: none;
  }
`;

const Photo = styled(AddAPhoto)`
  position: absolute;
  top: 40%;
  left: 35%;
  width: 100px;
  color: white;
  cursor: pointer;
`;

const Title = styled.div`
  position: absolute;
  left: 30px;
  bottom: 120px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

const KeywordContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 80%;
  margin: 20px;
  height: 50px;
  color: white;
`;

const Keyword = styled.span`
  margin: 5px;
  padding: 1px 10px;
  border-radius: 5px;
  background-color: rgba(256, 256, 256, 0.2);
  font-size: 0.9rem;
  font-weight: bold;
`;

const InfoContainer = styled(KeywordContainer)`
  bottom: -5px;
`;

const Info = styled(Keyword)`
  background-color: rgba(233, 70, 81, 0.6);
  font-size: 0.8rem;
`;

const Loading = styled(LoaderCircle)`
  display: block;
  width: 80px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.pink};
  animation: rotate 4s 0s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;

export default CreateClass;
