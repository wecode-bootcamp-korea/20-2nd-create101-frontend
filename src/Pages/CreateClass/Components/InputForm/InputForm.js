import React from 'react';
import styled from 'styled-components';

function InputForm(props) {
  return (
    <>
      <label>
        <Text margin="10px 0" size="0.8">
          {props.label}
        </Text>
        <Input
          name={props.name}
          value={props.value}
          onChange={e => {
            props.setValue(e.target.value);
          }}
          type={props.type}
          width={props.width}
        />
      </label>
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.lighterGray};
  background-color: white;
  font-size: 0.9rem;
`;

export default InputForm;
