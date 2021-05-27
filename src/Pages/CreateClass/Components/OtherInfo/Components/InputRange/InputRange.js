import React from 'react';
import styled from 'styled-components';

function InputRange(props) {
  return (
    <Box>
      <label htmlFor={props.info}>
        <Text>{props.label}</Text>
      </label>
      <Container>
        <Input
          name={props.info}
          value={props.value.min}
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={e => {
            if (
              Number(e.target.value) + 2 * Number(props.step) <=
              Number(props.value.max)
            ) {
              props.setValue({ ...props.value, min: e.target.value });
            }
          }}
          type="range"
        />
        <Input
          name={props.info}
          value={props.value.max}
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={e => {
            Number(props.value.min) + 2 * Number(props.step) <=
              Number(e.target.value) &&
              props.setValue({ ...props.value, max: e.target.value });
          }}
          type="range"
        />
        <GaugeBar>
          <Gauge
            min={(1 - (props.max - props.value.min) / props.max) * 100}
            max={((props.max - props.value.max) / props.max) * 100}
          >
            <Thumb left>
              <Value>
                {Number(props.value.min).toLocaleString() + props.unit}
              </Value>
            </Thumb>
            <Thumb rigth>
              <Value right>
                {Number(props.value.max).toLocaleString() + props.unit}
              </Value>
            </Thumb>
          </Gauge>
        </GaugeBar>
      </Container>
    </Box>
  );
}

const Box = styled.div`
  height: 120px;
`;

const Text = styled.div`
  margin: 20px 0;
  font-size: 0.8rem;
  line-height: normal;
`;

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 95%;
  border: 1px solid ${({ theme }) => theme.lighterGray};
  background-color: white;
  pointer-events: none;
  appearance: none;
  opacity: 0;
  z-index: 10;

  &::-webkit-slider-thumb {
    pointer-events: all;
    appearance: none;
    width: 20px;
    height: 40px;
  }

  &::-moz-range-thumb {
    pointer-events: all;
    appearance: none;
    width: 20px;
    height: 40px;
  }

  @media ${({ theme }) => theme.mobile} {
    width: 90%;
    margin-left: 3%;
  }
`;

const GaugeBar = styled.div`
  position: relative;
  top: 5px;
  width: 95%;
  height: 8px;
  border-radius: 4px;
  background-color: lightgray;
  z-index: -1;

  @media ${({ theme }) => theme.mobile} {
    width: 90%;
    margin-left: 3%;
  }
`;

const Gauge = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: ${props => `${props.min}%`};
  right: ${props => `${props.max}%`};
  height: 8px;
  background-color: ${({ theme }) => theme.pink};
`;

const Thumb = styled.div`
  position: relative;
  left: ${props => props.right && '4px'};
  right: ${props => props.left && '4px'};
  bottom: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.pink};
`;

const Value = styled.div`
  position: relative;
  top: 20px;
  width: max-content;
  padding: 3px 5px;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;

  @media ${({ theme }) => theme.web} {
    color: white;
    background-color: ${({ theme }) => theme.pink};
    font-size: 0.8rem;
    transform: translateX(-30%);
  }

  @media ${({ theme }) => theme.mobile} {
    color: ${({ theme }) => theme.pink};
    font-size: 0.5rem;
    transform: ${props =>
      props.end ? 'translateX(-120%)' : 'translateX(-60%)'};
    white-space: nowrap;
  }
`;

export default InputRange;
