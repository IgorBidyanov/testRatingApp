import React, { useEffect, useState } from 'react';
import classes from 'styles/Header.module.css'
import { useAppSelector } from 'stores/hooks';
import MyModal from './UI/modal/MyModal';
import AuthForm from './AuthForm';
import Logout from './Logout';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { admin } = useAppSelector(state => state.auth)

  const navigation = useNavigate() as NavigateFunction

  const [authModalActive, setAuthModalActive] = useState<boolean>(false)
  const [logoutModalActive, setLogoutModalActive] = useState<boolean>(false)

  const toggleAuthModal = () => {
    setAuthModalActive(prevState => !prevState)
  }

  const toggleLogoutModal = () => {
    setLogoutModalActive(prevState => !prevState)
  }

  const navToNewEmployer = () => {
    navigation('employer/new')
  }

  useEffect(() => {
    if (admin && authModalActive) {
      toggleAuthModal()
    }
    if (!admin && logoutModalActive) {
      toggleLogoutModal()
    }
  }, [admin, authModalActive, logoutModalActive])

  return (
    <header className={classes.header}>
      {admin ? (
        <div className={classes.header__buttons}>
          <button
            className={`${classes.header__button} ${classes.header__btnText}`}
            onClick={navToNewEmployer}
          >
            + Добавить нового работника
          </button>

          <button className={classes.header__button} onClick={toggleLogoutModal}>
            <span className={classes.header__btnText}>Выйти</span>
          </button>
        </div>
      ) : (
        <button className={classes.header__button} onClick={toggleAuthModal}>
          <span className={classes.header__btnText}>Войти</span>
        </button>
      )}

      {authModalActive && (
        <MyModal
          setActive={toggleAuthModal}
        >
          <AuthForm />
        </MyModal>)
      }
      
      {logoutModalActive && (
        <MyModal
          setActive={toggleLogoutModal}
        >
          <Logout toggleActiveModal={toggleLogoutModal} />
        </MyModal>)
      }
    </header>
  );
}

export default Header;