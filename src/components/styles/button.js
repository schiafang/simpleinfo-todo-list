import styled from 'styled-components'

export const ButtonWrapper = styled.div`
  margin-left: 20px;
`

export const Button = styled.button`
  border-radius: 50%;
  outline: 0;
  border: none;
  cursor: pointer;
  width: 64px;
  height: 64px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &.create {
    background-color: #6969ff;
    box-shadow: 0px 4px 12px #0000004d;
  }

  &.create::after {
    content: '+';
    display: block;
    font-size: 55px;
    color: #fff;
    transition: transform 0.3s ease-in-out;
  }

  &.create:hover::after {
    transform: scale(1.1);
  }

  &.confirm {
    background-color: #80e894;
    box-shadow: 0px 4px 12px #0000004d;
    position: relative;
  }

  &.confirm::after,
  &.confirm::before {
    content: '';
    display: block;
    width: 4px;
    position: absolute;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;
  }

  &.confirm::after {
    height: 15px;
    top: 33px;
    left: 22px;
    transform: rotate(135deg);
  }

  &.confirm::before {
    height: 30px;
    top: 20px;
    left: 35px;
    transform: rotate(38deg);
  }

  &.cancel {
    border: 4px solid #b1b1b1;
    background-color: transparent;
    position: relative;
  }

  &.cancel::after,
  &.cancel::before {
    content: '';
    display: block;
    width: 4px;
    height: 30px;
    background-color: #b1b1b1;
    position: absolute;
    top: 14px;
    left: 26px;
    transform: rotate(45deg);
    transition: transform 0.3s ease-in-out;
  }

  &.cancel::after {
    transform: rotate(45deg);
  }

  &.cancel::before {
    transform: rotate(135deg);
  }
`
