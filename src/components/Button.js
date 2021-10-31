import * as S from './styles/button'

const Button = ({ status = 'create', onClick }) => {
  return (
    <S.ButtonWrapper>
      <S.Button className={status} onClick={onClick} />
    </S.ButtonWrapper>
  )
}

export default Button
