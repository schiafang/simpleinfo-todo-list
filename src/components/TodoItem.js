import * as S from './styles/todoItem'
import Checkbox from './Checkbox'
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react'

const TodoItem = ({
  todoId = null,
  isDone = false,
  content = '',
  hidden = false,
  mode = 'display', // create, edit, display
  createData,
  updateData = () => {},
  deleteData = () => {},
  setNewTodo = () => {},
}) => {
  const textAreaRef = useRef(null)
  const containerRef = useRef(null)

  const [contentState, setContentState] = useState('')
  const [editMode, setEditMode] = useState(false)

  const todoItemContainerProps = {
    edit: editMode && mode !== 'create',
    isDone,
  }

  const handleTextChange = (e) => {
    let value = e.target.value.replace(/\r\n|\n/g, '').trim()
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

  const handleSubmit = () => {
    if (todoId) {
      handleTodoUpdate()
    } else {
      createData()
    }
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
    if (textAreaRef && containerRef) {
      textAreaRef.current.style.height = '27px'
      const scrollHeight = textAreaRef.current.scrollHeight
      textAreaRef.current.style.height = Math.max(scrollHeight, 27) + 'px'

      // console.log({
      //   ['containerRef width']: containerRef.current.offsetWidth,
      //   scrollHeight,
      //   ['width']: textAreaRef.current.style.width,
      //   ['height']: textAreaRef.current.style.height,
      // })
    }
  }, [editMode, contentState])

  return (
    <S.TodoItemBackground isHidden={hidden}>
      <S.CloseIcon onClick={handleTodoDelete} />
      <S.TodoItemContainer {...todoItemContainerProps} ref={containerRef}>
        <div className='check-area'>
          <Checkbox
            isDone={isDone}
            updateDataStatus={() =>
              updateData({ todoId, isDone: !isDone, content })
            }
          />
        </div>
        <div className='text-content' onClick={() => setEditMode(true)}>
          <S.TodoItemTextArea
            ref={textAreaRef}
            rows='1'
            height='24'
            wrap='off'
            maxLength={500}
            autoComplete='off'
            value={contentState}
            onBlur={handleSubmit}
            onChange={handleTextChange}
            onKeyDown={(e) => e.keyCode === 13 && handleSubmit()}
            placeholder={!todoId ? '要新增的待辦事項' : ''}
          />
        </div>
      </S.TodoItemContainer>
    </S.TodoItemBackground>
  )
}

export default TodoItem
