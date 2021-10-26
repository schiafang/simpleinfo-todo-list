import './App.css'
import TodoItem from './components/TodoItem'
import { useEffect, useState } from 'react'
import fetch from './utilities/fetch'
import Button from './components/Button'

function App() {
  const [data, setData] = useState([])
  const [createMode, setCreateMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newTodo, setNewTodo] = useState('')

  const [isDoneData, setIsDoneData] = useState([])

  const fetchData = async () => {
    try {
      const dataResponse = await fetch.get()

      setIsDoneData(() => dataResponse.data.filter((i) => i.is_done))
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

    console.log(`createMode`, createMode)
  }, [])

  useEffect(() => {
    console.log(`isDoneData`, isDoneData)
  }, [isDoneData])

  return (
    <div className='main-container'>
      <header className='header'>Todos</header>

      {isLoading ? null : (
        <>
          <div className='data-group'>
            <div className='group-title'>未完成待辦({isDoneData.length})</div>
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
            <div className='group-title'>已完成待辦(20)</div>
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

          <TodoItem
            todoId={null}
            isDone={false}
            content={newTodo}
            hidden={!createMode}
          />

          <div className='buttons-control'>
            {createMode ? (
              <>
                <Button
                  status='cancel'
                  onClick={() => {
                    setNewTodo('')
                    setCreateMode(false)
                  }}
                />
                <Button
                  status='confirm'
                  onClick={() => {
                    createData(newTodo)
                    setCreateMode(false)
                  }}
                />
              </>
            ) : (
              <Button status='create' onClick={() => setCreateMode(true)} />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
