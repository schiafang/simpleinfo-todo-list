import * as S from './styles/TodoItem'
import Checkbox from './Checkbox'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'

const TodoItem = ({
  todoId = null,
  isDone = false,
  content = '',
  hidden = false,
  mode = 'display', // create, edit, display
  updateData = () => {},
  deleteData = () => {},
  setNewTodo = () => {},
}) => {
  const textAreaRef = useRef(null)

  const [contentState, setContentState] = useState('')
  const [editMode, setEditMode] = useState(false)

  const todoItemContainerProps = {
    edit: editMode && mode !== 'create',
    isDone,
  }

  const handleTextChange = (e) => {
    let value = e.target.value.trim()
    setContentState(value)
    if (mode === 'create') {
      setNewTodo(value)
    }
  }

  const handleTodoUpdate = (e) => {
    if (contentState === content || !todoId) {
      setEditMode(false)
      return
    }
    updateData({ todoId, isDone, content: contentState })
    setEditMode(false)
  }

  const handleTodoDelete = (e) => {
    deleteData(todoId)
    setEditMode(false)
  }

  useEffect(() => {
    setContentState(content)
  }, [])

  useEffect(() => {
    if (mode === 'create' && !content) {
      setContentState('')
    }
  }, [content])

  useLayoutEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = '16px'
      textAreaRef.current.style.height =
        Math.max(textAreaRef.current.scrollHeight, 16) + 'px'
    }
  }, [contentState])

  return (
    <S.TodoItemBackground hidden={hidden}>
      <S.CloseIcon onClick={handleTodoDelete} />
      <S.TodoItemContainer {...todoItemContainerProps}>
        <div className='check-area'>
          <Checkbox
            isDone={isDone}
            updateDataStatus={() =>
              updateData({ todoId, isDone: !isDone, content })
            }
          />
        </div>
        <div className='text-content' onClick={() => setEditMode(true)}>
          <textarea
            ref={textAreaRef}
            rows='1'
            height='16'
            wrap='off'
            maxLength={500}
            autoComplete='off'
            value={contentState}
            onBlur={() => (todoId ? handleTodoUpdate() : null)}
            onChange={handleTextChange}
            placeholder={!todoId ? '要新增的待辦事項' : ''}
          />
        </div>
      </S.TodoItemContainer>
    </S.TodoItemBackground>
  )
}

export default TodoItem
