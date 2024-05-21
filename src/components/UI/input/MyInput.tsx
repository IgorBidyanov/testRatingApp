import React, { InputHTMLAttributes, RefObject } from 'react';
import { HTMLInputTypeAttribute } from 'react';
import classes from './MyInput.module.css'
import showPassIcon from 'assets/img/eyeOpenIcon.svg'
import hidePassIcon from 'assets/img/eyeIcon.svg'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute,
  label: string
  isPassword?: boolean
  isError?: boolean
  showPassword?: () => void
  innerRef?: RefObject<HTMLInputElement>
}

const MyInput: React.FC<IProps> = (props) => {
  const { isPassword, showPassword, isError, innerRef, ...restProps } = props
  const togglePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    showPassword && showPassword()
  }
  return (
    <label className={classes.label}>
      <span className={classes.labelText}>{props.label}</span>
      
      <div className={isError ? `${classes.inputWrapper} ${classes.error}` : classes.inputWrapper}>
        <input {...restProps} className={classes.input} ref={innerRef} />
        
        {isPassword ? (
          <button className={classes.showPassBtn} onClick={togglePassword}>
            <img src={props.type === 'text' ? showPassIcon : hidePassIcon} alt="Показать/скрыть пароль" />
          </button>
        ): null}
      </div>
    </label>
  );
}

export default MyInput;