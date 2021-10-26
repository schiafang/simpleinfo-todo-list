import './button.css'

const Button = ({ status = 'create', onClick }) => {
  return (
    <div className='button-wrapper'>
      <button className={status} onClick={onClick} />
    </div>
  )
}

export default Button
