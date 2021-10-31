import './App.css'
import { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import Button from '../components/Button'
import fetch from '../utilities/fetch'

function App() {
  const [data, setData] = useState([])
  const [createMode, setCreateMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newTodo, setNewTodo] = useState('')

  function countDataLength(key) {
    const count = data.reduce(
      (pre, cur) => {
        if (cur.is_done) {
          pre['done']++
        } else {
          pre['todo']++
        }
        return pre
      },
      { done: 0, todo: 0 }
    )
    return count[key]
  }

  function updateStateData(modifyData) {
    const newData = data.map((i) => {
      if (i.id === modifyData.id) {
        return modifyData
      }
      return i
    })
    setData(newData)
  }

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
    if (!newTodo) return
    try {
      const response = await fetch.post({ content: newTodo })
      if (response.status === 200 || response.status === 201) {
        setNewTodo('')
        setCreateMode(false)
        let newData = Array.prototype.slice.call(data)
        newData.unshift(response.data)
        setData(newData)
        //卷動到上方
      } else {
        throw 'Create Error'
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateData = async (data) => {
    const { isDone, todoId, content } = data
    if (!content || !todoId) return
    try {
      const response = await fetch.put(todoId, { content, is_done: isDone })
      if (response.status === 200 || response.status === 201) {
        updateStateData(response.data)
      } else {
        throw 'Update Error'
      }
    } catch (e) {
      console.error(e)
    }
  }

  const deleteData = async (todoId) => {
    if (!todoId) return
    try {
      const response = await fetch.delete(todoId)
      if (response.status === 200 || response.status === 201) {
        let newData = data.filter((i) => i.id !== todoId)
        setData(newData)
      } else {
        throw 'Delete Error'
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    countDataLength('todo')
  }, [data])

  return (
    <div className='main-container'>
      <header className='header'>Todos</header>

      {isLoading ? null : (
        <>
          <div className='data-group'>
            <div className='group-title'>
              未完成待辦({countDataLength('todo')})
            </div>

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
            <div className='group-title'>
              已完成待辦({countDataLength('done')})
            </div>
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
            createData={() => createData(newTodo)}
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
