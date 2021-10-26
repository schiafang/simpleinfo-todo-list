import './todo-item.css'
import Checkbox from './Checkbox'
import { useState, useEffect } from 'react'

const TodoItem = ({ todoId, isDone, content, updateData }) => {
  const [contentState, setContentState] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [createMode, setCreateMode] = useState(false)

  useEffect(() => {
    setContentState(content)
  }, [])

  return (
    <div
      className={`todoitem-wrapper ${isDone ? 'is-done' : ''} ${
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
