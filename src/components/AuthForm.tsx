import React, { useCallback, useState } from 'react';
import MyInput from './UI/input/MyInput';
import classes from 'styles/AuthForm.module.css'
import MyButton from './UI/button/MyButton';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { getAdminDataAction, getTokenByAuthAction } from 'stores/auth/actions';
import { IGetToken } from 'types/AuthTypes';
import Preloader from './UI/preloader/Preloader';

type TInputType = 'text' | 'password'

interface IErrors {
  email?: string
  password?: string
}

const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const { isLoading, authError } = useAppSelector(state => state.auth)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [typePasswordInput, setTypePasswordInput] = useState<TInputType>('password')
  const [activeBtn, setActiveBtn] = useState<boolean>(true)
  const [errors, setErrors] = useState<IErrors>({})

  const changeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    !activeBtn && setActiveBtn(true)
  }, [activeBtn])

  const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    !activeBtn && setActiveBtn(true)
  }, [activeBtn])

  const showPassword = useCallback(() => {
    setTypePasswordInput(prevState => prevState === 'password' ? 'text' : 'password')
  }, [])

  const checkForm = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrors({})
    setActiveBtn(false)
    let formValid = true
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if (!pattern.test(email)) {
      formValid = false
      setActiveBtn(false)
      setErrors(prevState => ({ ...prevState, email: 'Некорректный Email' }))
    }

    if (password.length < 6) {
      formValid = false
      setActiveBtn(false)
      setErrors(prevState => ({ ...prevState, password: 'Пароль должен состоять минимум из 6 символов' }))
    }

    if (formValid) {
      setActiveBtn(true)
      await dispatch(getTokenByAuthAction({email, password})).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          const { idToken } = result.payload as IGetToken
          dispatch(getAdminDataAction(idToken))
        }
      })
    }
  }

  return (
    <div className={classes.auth}>
      <h2>Авторизация</h2>

      <form className={classes.auth__form} onSubmit={checkForm}>
        <div className='inputWrapper'>
          <MyInput
            placeholder='Email'
            label='Введите email'
            type='email'
            value={email}
            onChange={changeEmail}
            isError={!!errors.email || !!authError}
          />

          <p className='input__errorText'>{errors.email}</p>
        </div>

        <div className='inputWrapper'>
          <MyInput
            placeholder='Password'
            label='Введите пароль'
            type={typePasswordInput}
            value={password}
            isPassword
            onChange={changePassword}
            showPassword={showPassword}
            isError={!!errors.password || !!authError}
          />

          <p className='input__errorText'>{errors.password}</p>
        </div>

        <p className='input__errorText'>{authError}</p>

        <MyButton type='submit' disabled={!activeBtn}>Войти</MyButton>
      </form>

      {isLoading && (<Preloader />)}
    </div>
  );
}

export default AuthForm;