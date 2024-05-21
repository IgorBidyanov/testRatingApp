import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import classes from './BackBtn.module.css'

const BackBtn: React.FC = () => {
  const navigation = useNavigate() as NavigateFunction

  const goHome = () => {
    navigation('/')
  }

  return (
    <div className={classes.backBtn}>
      <button onClick={goHome} className={classes.backBtn__button}>Назад</button>
    </div>
  );
}

export default BackBtn;