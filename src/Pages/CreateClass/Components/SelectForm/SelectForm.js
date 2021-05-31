import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { valueState } from '../../state/state';

function SelectForm(props) {
  const [values, setValues] = useRecoilState(valueState);

  return (
    <>
      <Text margin="10px 0" size="0.8">
        {props.label}
      </Text>
      <Select
        name={props.name}
        value={values[props.name].id}
        defaultValue="default"
        onChange={e => {
          setValues({
            ...values,
            [e.target.name]: {
              id: Number(e.target.value),
              name: e.target.selectedOptions[0].innerText,
            },
          });
        }}
      >
        <Option disabled value="default" hidden>
          {props.select}
        </Option>
        {props.options &&
          props.options.map((option, index) => (
            <Option key={index} value={option.id}>
              {option.name}
            </Option>
          ))}
      </Select>
    </>
  );
}

const Text = styled.div`
  margin: ${props => props.margin};
  color: ${props => props.color};
  font-size: ${props => props.size}rem;
  font-weight: ${props => props.bold && 'bold'};
  line-height: normal;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.lighterGray};
  background-color: white;
  color: gray;
  outline: 1px solid ${({ theme }) => theme.transparent};

  &:hover {
    border-color: lightgray;
  }
`;

const Option = styled.option`
  color: black;
  font-size: 0.8rem;
`;

export default SelectForm;
