import React, { ButtonHTMLAttributes, useMemo } from 'react';
import classes from './MyButton.module.css'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | undefined
  cancelBtn?: boolean,
  removeBtn?: boolean
}

const MyButton: React.FC<IProps> = ({children, cancelBtn, removeBtn, ...restProps}) => {

  const buttonStyles = useMemo(() => {
    let classNames = [classes.myButton]
    if (cancelBtn) {
      classNames.push(classes.cancelBtn)
    } else if (removeBtn) {
      classNames.push(classes.removeBtn)
    }
    return classNames.join(' ')
  }, [cancelBtn, removeBtn])

  return (
    <button
      className={buttonStyles}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default MyButton;