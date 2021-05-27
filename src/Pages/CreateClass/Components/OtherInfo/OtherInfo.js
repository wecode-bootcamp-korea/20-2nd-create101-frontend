import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { monthState, priceState, descState } from '../../state/state';
import InputForm from '../InputForm/InputForm';
import InputRange from './Components/InputRange/InputRange';

function OtherInfo(props) {
  const [month, setMonth] = useRecoilState(monthState);

  const [price, setPrice] = useRecoilState(priceState);

  const [desc, setDesc] = useRecoilState(descState);

  return (
    <>
      <Text>🔍 아래 사항을 심사한 후 클래스가 생성됩니다.</Text>
      <InputRange
        label="클래스는 대략 몇 개월 과정인가요?"
        info="month"
        value={month}
        min="0"
        max="24"
        step="1"
        unit="개월"
        setValue={setMonth}
      />
      <InputRange
        label="책정을 희망하시는 수강료는 얼마인가요?"
        info="price"
        value={price}
        min="0"
        max="1000000"
        step="50000"
        unit="원"
        setValue={setPrice}
      />
      <InputForm
        label="간단한 소개말을 입력해 주세요. (선택 사항)"
        info={desc}
        setValue={setDesc}
      />
    </>
  );
}

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: normal;
`;

export default OtherInfo;
