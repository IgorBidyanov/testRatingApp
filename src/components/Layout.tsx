import React, { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Header from './Header';
import Preloader from './UI/preloader/Preloader';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import classes from 'styles/Layout.module.css'
import Cookies from 'js-cookie';
import { getAdminDataAction } from 'stores/auth/actions';

const Layout: React.FC = () => {
  const dispatch = useAppDispatch()

  const isLoadingAuth = useAppSelector(state => state.auth.isLoading)
  const isLoadingEmployers = useAppSelector(state => state.employers.isLoading)

  const location = useLocation()
  const { id } = useParams()

  

  const title = useMemo(() => {
    if (location.pathname === '/') {
      return 'Рейтинг'
    } else if (location.pathname === `/employer/${id}`) {
      return 'Профиль'
    } else if (location.pathname === `/employer/new`) {
      return 'Добавление работника'
    } else {
      return
    }
  }, [location, id])

  useEffect(() => {
    const token = Cookies.get('ratingAppToken')

    if (token) {
      dispatch(getAdminDataAction(token))
    }
  }, [dispatch])

  return (
    <>
      <Header />

      <main>
        <section>
          { title && <h1 className={ classes.page__title }>{ title }</h1> }

          <Outlet />
        </section>
      </main>

      {(isLoadingAuth || isLoadingEmployers) && <Preloader />}
    </>
  );
}

export default Layout;