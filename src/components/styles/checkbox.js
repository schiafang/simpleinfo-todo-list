import styled from 'styled-components'

export const CheckLabel = styled.label`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #6969ff;
  cursor: pointer;

  &::after {
    opacity: 0;
    content: '';
    display: block;
    width: 32px;
    height: 32px;
    background-color: #6969ff;
    border-radius: 50%;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: all 0.8 ease;

    &:hover {
      opacity: 0.3;
    }
  }

  &l:hover {
    border: 4px solid #6969ff;
  }
`

export const CheckInput = styled.input`
  display: none;

  &t:checked + .checkbox-label {
    border: 4px solid #6969ff50;
  }

  &:checked + .checkbox-label::after {
    opacity: 0.5;
  }
`
