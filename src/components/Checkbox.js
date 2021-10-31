import * as S from './styles/checkbox'
import { useState, useEffect } from 'react'

const Checkbox = ({ isDone, updateDataStatus }) => {
  const [state, setstate] = useState(false)

  useEffect(() => {
    setstate(isDone)
  }, [isDone])
  return (
    <div>
      <S.CheckInput
        className='checkbox-input'
        type='checkbox'
        defaultValue={state}
        checked={state}
        onChange={(e) => {
          // console.log(`e.target.checked`, e.target.checked)
          return null
        }}
      />
      <S.CheckLabel
        className='checkbox-label'
        onClick={() => updateDataStatus()}
      />
    </div>
  )
}

export default Checkbox
