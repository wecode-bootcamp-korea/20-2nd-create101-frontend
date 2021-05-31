import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Heart } from '@styled-icons/evil';
import { Heart as FilledHeart } from '@styled-icons/evaicons-solid';
import { API } from '../../config';

function ClassCard(props) {
  const { componentData } = props;

  const [like, setLike] = useState(componentData.liked);

  const handleLike = id => {
    setLike(!like);
    fetch(`http://10.58.5.232:8000/users/like/${id}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    });
  };

  const history = useHistory();

  const handleClick = id => {
    history.push(`/courses/${id}`);
    fetch(`http://10.58.5.232:8000/users/look/${id}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    });
  };

  return (
    <MainContainer
      onClick={() => {
        handleClick(componentData.id);
      }}
      alignLeft={props.left}
    >
      <div>
        <ImageContainer>
          <span>
            <Picture src={componentData.thumbnail} alt="class thumbnail" />
            {like && <FilledButton />}
            <SaveButton
              onClick={e => {
                e.stopPropagation();
                handleLike(componentData.id);
              }}
            />
          </span>
        </ImageContainer>
        <div>
          <InfoTagContainer>
            <FirstInfoTag>{componentData.sub_category}</FirstInfoTag>
            <Seperator />
            ・&nbsp;
            <div>{componentData.user}</div>
          </InfoTagContainer>
          <Text>{componentData.title}</Text>
          <HeartContainer>
            <HeartButton />
            <HeartCount>
              {like ? componentData.like + 1 : componentData.like}
            </HeartCount>
          </HeartContainer>
        </div>
        <DividerContainer>
          <Divider />
        </DividerContainer>
        <div>
          <OriginalPrice>
            {componentData.month === 1
              ? ' '
              : `${componentData.price.toLocaleString()}원`}
          </OriginalPrice>
        </div>
        <PriceContainer>
          {componentData.month > 1 ? (
            <>
              <PricePerMonth>
                월&nbsp;
                {Math.round(
                  componentData.price / componentData.month
                ).toLocaleString()}
                원
              </PricePerMonth>
              <Month>({componentData.month}개월)</Month>
            </>
          ) : (
            <PricePerMonth>
              {componentData.price.toLocaleString()}원
            </PricePerMonth>
          )}
        </PriceContainer>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 270px;
  margin: 25px ${props => (props.alignLeft ? '10px' : 'auto')};
  cursor: pointer;

  @media ${({ theme }) => theme.mobile} {
    width: 38vw;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin: 5px 0;
  border-radius: 5px;
  overflow: hidden;
`;

const Picture = styled.img`
  width: 100%;
  object-fit: cover;

  &:hover {
    animation: mouseover 1s;
  }

  @keyframes mouseover {
    from {
      transform: scale(1.1);
    }
    to {
      transform: scale(1);
    }
  }
`;

const SaveButton = styled(Heart)`
  color: white;
  width: 30px;
  position: absolute;
  top: 8px;
  right: 8px;
  /* color: ${props => props.theme.classComponentGrey}; */
  color: white;
`;

const FilledButton = styled(FilledHeart)`
  color: white;
  width: 26px;
  position: absolute;
  top: 9px;
  right: 10px;
`;

const InfoTagContainer = styled.div`
  display: flex;
  padding: 5px 5px 2px 0px;
  font-size: 12px;
  font-weight: 600;
`;

const FirstInfoTag = styled.div`
  padding-right: 3px;
`;

const Seperator = styled.span`
  padding-right: 3px;
`;

const Text = styled.div`
  line-height: 25px;
  font-size: 15px;
`;

const HeartContainer = styled.div`
  display: flex;
`;

const HeartButton = styled(Heart)`
  display: flex;
  width: 8%;
  color: ${props => props.theme.classComponentGrey};
`;

const HeartCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${props => props.theme.classComponentGrey};
`;

const DividerContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  height: 0px;
  border: none;
  border-top: 0.5px solid ${props => props.theme.classComponentLightGrey};
`;

const OriginalPrice = styled.div`
  font-size: 12px;
  color: ${props => props.theme.classComponentGrey};
  margin-bottom: 5px;
  white-space: pre;
`;

const PriceContainer = styled.div`
  display: flex;
`;

const PricePerMonth = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding-right: 3px;
`;

const Month = styled.div`
  font-size: 12px;
  display: flex;
  align-items: flex-end;
`;

export default ClassCard;
