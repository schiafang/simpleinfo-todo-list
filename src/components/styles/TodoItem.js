import styled from 'styled-components'

export const TodoItemBackground = styled.div`
  background-color: #e36377;
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0px 3px 8px #97767626;
  margin-bottom: 24px;
  position: relative;
  opacity: ${({ hidden }) => (hidden ? 1 : 1)};
`

export const TodoItemContainer = styled.div`
  display: block;
  display: flex;
  align-items: center;
  border-radius: 24px;
  padding: 24px 24px 24px 0;
  height: auto;
  transition: all 0.3s ease-in-out;
  position: relative;
  width: ${({ edit }) => (!edit ? `100%` : `calc(100% - 125px)`)};
  background-color: ${({ isDone }) => (isDone ? `#dbdbdb` : `#fafafa`)};

  .check-area {
    padding: 0 24px;
  }

  .text-content {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .text-content textarea {
    line-height: 1;
    text-align: left;
    color: #626262;
    width: 100%;
    height: auto;
    background-color: transparent;
  }
`

export const CloseIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 32px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transform: translateY(-50%) rotate(45deg);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1) translateY(-50%) rotate(45deg);
  }
  &::after,
  &::before {
    content: '';
    display: block;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  &::after {
    width: 4px;
    height: 32px;
  }
  &::before {
    width: 32px;
    height: 4px;
  }
`
