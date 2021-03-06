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
      <Text>π μλ μ¬ν­μ μ¬μ¬ν ν ν΄λμ€κ° μμ±λ©λλ€.</Text>
      <InputRange
        label="ν΄λμ€λ λλ΅ λͺ κ°μ κ³Όμ μΈκ°μ?"
        info="month"
        value={month}
        min="0"
        max="24"
        step="1"
        unit="κ°μ"
        setValue={setMonth}
      />
      <InputRange
        label="μ±μ μ ν¬λ§νμλ μκ°λ£λ μΌλ§μΈκ°μ?"
        info="price"
        value={price}
        min="0"
        max="1000000"
        step="50000"
        unit="μ"
        setValue={setPrice}
      />
      <InputForm
        label="κ°λ¨ν μκ°λ§μ μλ ₯ν΄ μ£ΌμΈμ. (μ ν μ¬ν­)"
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
