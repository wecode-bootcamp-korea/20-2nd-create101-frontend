import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart } from '@styled-icons/evil';

function CardComponent(props) {
  const { componentData } = props;
  return (
    <MainContainer>
      <div>
        <ImageContainer>
          <span>
            <Picture src={componentData.thumbnail} alt="class image" />
            <SaveButton />
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
            <HeartCount>{componentData.like}</HeartCount>
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
  width: 260px;
  margin: auto;
  margin-top: 50px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Picture = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const SaveButton = styled(Heart)`
  color: ${props => props.theme.classComponentGrey};
  width: 10%;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const InfoTagContainer = styled.div`
  display: flex;
  padding: 5px 5px 2px 0px;
  font-size: 12px;
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

export default CardComponent;
