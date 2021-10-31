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
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
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
`

export const TodoItemTextArea = styled.textarea`
  line-height: 27px;
  letter-spacing: 1.25px;
  text-align: left;
  color: #626262;
  width: 100%;
  max-width: 100%;
  height: auto;
  padding-right: 24px;
  background-color: transparent;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
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
