import React from 'react';
import MyButton from './UI/button/MyButton';
import classes from 'styles/Logout.module.css'
import { useAppDispatch } from 'stores/hooks';
import { logoutReducer } from 'stores/auth';

interface IProps {
  toggleActiveModal: () => void
}

const Logout: React.FC<IProps> = ({ toggleActiveModal }) => {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutReducer())
  }

  return (
    <div className={classes.logout}>
      <h2>Вы уверены, что хотите выйти?</h2>

      <div className={classes.logout__btns}>
        <MyButton onClick={logout}>Выйти</MyButton>
        
        <MyButton cancelBtn onClick={toggleActiveModal}>Отмена</MyButton>
      </div>
    </div>
  );
}

export default Logout;