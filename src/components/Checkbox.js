import './checkbox.css'
import { useState, useEffect } from 'react'

const Checkbox = ({ isDone, updateDataStatus }) => {
  const [state, setstate] = useState(false)

  useEffect(() => {
    setstate(isDone)

    console.log(`isDone`, isDone)
  }, [isDone])
  return (
    <div>
      <input
        className='checkbox-input'
        type='checkbox'
        defaultValue={state}
        checked={state}
        onChange={(e) => {
          console.log(`e.target.checked`, e.target.checked)
          // setstate((pre) => !pre)
          // updateDataStatus()
        }}
      ></input>
      <label className='checkbox-label' onClick={() => updateDataStatus()} />
    </div>
  )
}

export default Checkbox
