import './todo-item.css'
import Checkbox from './Checkbox'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'

const TodoItem = ({
  todoId = null,
  isDone = false,
  content = '',
  updateData = () => {},
  hidden = false,
}) => {
  const ref = useRef(null)

  const [contentState, setContentState] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [createMode, setCreateMode] = useState(false)

  useEffect(() => {
    setContentState(content)
  }, [])

  useLayoutEffect(() => {
    if (ref) {
      ref.current.style.height = '16px'
      ref.current.style.height = Math.max(ref.current.scrollHeight, 16) + 'px'
    }
  }, [contentState])

  return (
    <div
      style={{ opacity: hidden ? 0 : 1 }}
      className={`todo-item-wrapper ${isDone ? 'is-done' : ''} ${
        editMode ? 'edit' : ''
      }`}
    >
      <div className='check-area'>
        <Checkbox
          isDone={isDone}
          updateDataStatus={() => updateData({ todoId, isDone, content })}
        />
      </div>

      <div
        className='text-content-wrapper'
        onClick={() => {
          if (isDone) return
          setEditMode(true)
        }}
      >
        <textarea
          ref={ref}
          rows='1'
          autoComplete='off'
          placeholder={!todoId && '要新增的待辦事項'}
          disabled={isDone}
          maxLength={500}
          className='text-content'
          value={contentState}
          wrap='off'
          onKeyPress={(e) => {
            if (e.keyCode === 13) {
              return (e.target.value = e.target.value.trim())
            }
          }}
          onChange={(e) => {
            setContentState(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default TodoItem
