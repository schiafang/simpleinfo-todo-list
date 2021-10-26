import './App.css'
import TodoItem from './components/TodoItem'
import { useEffect, useState } from 'react'
import fetch from './utilities/fetch'

function App() {
  const [data, setData] = useState([])
  const [createMode, setCreateMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newTodo, setNewTodo] = useState('')

  const fetchData = async () => {
    try {
      const dataResponse = await fetch.get()
      setData(dataResponse.data)
      setIsLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  const createData = async (newTodo) => {
    setNewTodo('')
    const response = await fetch.post({ content: newTodo })

    fetchData()
  }

  const updateData = async (data) => {
    const { isDone, todoId, content } = data
    const response = await fetch.put(todoId, { is_done: !isDone, content })

    fetchData()
  }

  const removeData = async (todoId) => {
    const response = await fetch.delete(todoId)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='main-container'>
      <header className='header'>Todos</header>

      {isLoading ? null : (
        <>
          <div className='data-group'>
            <div className='group-title'>未完成待辦</div>
            {data.map((item) => {
              const { id, is_done, content } = item
              return !is_done ? (
                <TodoItem
                  key={id}
                  todoId={id}
                  isDone={false}
                  content={content}
                  updateData={updateData}
                />
              ) : null
            })}
          </div>

          <div className='data-group'>
            <div className='group-title'>已完成待辦</div>
            {data.map((item) => {
              const { id, is_done, content } = item
              return is_done ? (
                <TodoItem
                  key={id}
                  todoId={id}
                  isDone={true}
                  content={content}
                  updateData={updateData}
                />
              ) : null
            })}
          </div>

          {createMode && (
            <input
              placeholder='要新增的待辦事項'
              className='new-todo'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  createData(newTodo)
                  setCreateMode(false)
                }
              }}
            />
          )}
          <div className='create-container'>
            {createMode ? (
              <>
                <button
                  className='cancel'
                  onClick={() => {
                    setNewTodo('')
                    setCreateMode(false)
                  }}
                ></button>
                <button
                  className='confirm'
                  onClick={() => {
                    createData(newTodo)
                    setCreateMode(false)
                  }}
                ></button>
              </>
            ) : (
              <button
                className='create'
                onClick={() => setCreateMode(true)}
              ></button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
