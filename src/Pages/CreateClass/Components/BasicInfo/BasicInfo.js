import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { titleState, valueState } from '../../state/state';
import SelectForm from '../SelectForm/SelectForm';
import InputForm from '../InputForm/InputForm';

function BasicInfo(props) {
  const [title, setTitle] = useRecoilState(titleState);
  const values = useRecoilValue(valueState);

  return (
    <>
      <Text>👩‍🏫 간단하게 어떤 클래스인지 알려주세요.</Text>
      <Desc margin="20px 0" color="gray" size="0.8">
        언젠가 이런 걸 가르쳐봐야지 생각해본 적이 있으신가요? 간단히
        크리에이터님이 알려 줄 수 있는 카테고리를 설정해봐요. 모든 수정 사항은
        즉시 저장되니 안심해 주세요.
      </Desc>
      <InputForm
        label="클래스 이름"
        name="title"
        value={title}
        setValue={setTitle}
      />
      <SelectForm
        label="카테고리"
        name="category"
        select="카테고리를 선택해 주세요."
        options={[
          { name: '취미', id: 1 },
          { name: '수익창출', id: 2 },
        ]}
      />
      <SelectForm
        label="세부 카테고리"
        name="subCategory"
        select="세부 카테고리를 선택해 주세요."
        options={subCategories[values.category.id]}
      />
      <SelectForm
        label="난이도"
        name="target"
        select="어떤 수강생에게 맞는 난이도인지 선택해 주세요."
        options={[
          { name: '입문자 대상', id: 4 },
          { name: '초급자 대상', id: 1 },
          { name: '중급자 대상', id: 2 },
          { name: '고급자 대상', id: 3 },
        ]}
      />
    </>
  );
}

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: normal;
`;

const Desc = styled.div`
  margin: 20px 0;
  color: gray;
  font-size: 0.8rem;
  line-height: normal;
`;

const subCategories = {
  1: [
    { name: '여행', id: 1 },
    { name: '스포츠', id: 2 },
    { name: '요리', id: 3 },
  ],
  2: [
    { name: '주식', id: 4 },
    { name: '부동산', id: 5 },
  ],
};

export default BasicInfo;
