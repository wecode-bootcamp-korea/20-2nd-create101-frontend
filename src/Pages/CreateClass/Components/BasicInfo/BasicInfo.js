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
      <Text>๐ฉโ๐ซ ๊ฐ๋จํ๊ฒ ์ด๋ค ํด๋์ค์ธ์ง ์๋ ค์ฃผ์ธ์.</Text>
      <Desc margin="20px 0" color="gray" size="0.8">
        ์ธ์  ๊ฐ ์ด๋ฐ ๊ฑธ ๊ฐ๋ฅด์ณ๋ด์ผ์ง ์๊ฐํด๋ณธ ์ ์ด ์์ผ์ ๊ฐ์? ๊ฐ๋จํ
        ํฌ๋ฆฌ์์ดํฐ๋์ด ์๋ ค ์ค ์ ์๋ ์นดํ๊ณ ๋ฆฌ๋ฅผ ์ค์ ํด๋ด์. ๋ชจ๋  ์์  ์ฌํญ์
        ์ฆ์ ์ ์ฅ๋๋ ์์ฌํด ์ฃผ์ธ์.
      </Desc>
      <InputForm
        label="ํด๋์ค ์ด๋ฆ"
        name="title"
        value={title}
        setValue={setTitle}
      />
      <SelectForm
        label="์นดํ๊ณ ๋ฆฌ"
        name="category"
        select="์นดํ๊ณ ๋ฆฌ๋ฅผ ์ ํํด ์ฃผ์ธ์."
        options={[
          { name: '์ทจ๋ฏธ', id: 1 },
          { name: '์์ต์ฐฝ์ถ', id: 2 },
        ]}
      />
      <SelectForm
        label="์ธ๋ถ ์นดํ๊ณ ๋ฆฌ"
        name="subCategory"
        select="์ธ๋ถ ์นดํ๊ณ ๋ฆฌ๋ฅผ ์ ํํด ์ฃผ์ธ์."
        options={subCategories[values.category.id]}
      />
      <SelectForm
        label="๋์ด๋"
        name="target"
        select="์ด๋ค ์๊ฐ์์๊ฒ ๋ง๋ ๋์ด๋์ธ์ง ์ ํํด ์ฃผ์ธ์."
        options={[
          { name: '์๋ฌธ์ ๋์', id: 4 },
          { name: '์ด๊ธ์ ๋์', id: 1 },
          { name: '์ค๊ธ์ ๋์', id: 2 },
          { name: '๊ณ ๊ธ์ ๋์', id: 3 },
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
    { name: '์ฌํ', id: 1 },
    { name: '์คํฌ์ธ ', id: 2 },
    { name: '์๋ฆฌ', id: 3 },
  ],
  2: [
    { name: '์ฃผ์', id: 4 },
    { name: '๋ถ๋์ฐ', id: 5 },
  ],
};

export default BasicInfo;
