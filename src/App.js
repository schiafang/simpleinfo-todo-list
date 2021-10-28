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
  // const [isDoneData, setIsDoneData] = useState([])

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
    try {
      const response = await fetch.post({ content: newTodo })
      const successStatus = 200 || 201 || 202
      if (response.status !== successStatus) {
        throw error
      }
      setNewTodo('')
      fetchData()
    } catch {
      console.error('Create Error')
    }
  }

  const updateData = async (data) => {
    const { isDone, todoId, content } = data
    await fetch.put(todoId, { content, is_done: isDone })
    fetchData()
  }

  const deleteData = async (todoId) => {
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
                  deleteData={deleteData}
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
                  deleteData={deleteData}
                />
              ) : null
            })}
          </div>

          <TodoItem
            content={newTodo}
            hidden={!createMode}
            mode='create'
            setNewTodo={setNewTodo}
          />

          <div className='buttons-control'>
            {createMode ? (
              <>
                <Button status='cancel' onClick={() => setCreateMode(false)} />
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
