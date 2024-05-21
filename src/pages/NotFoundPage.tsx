import React from 'react';
import { Link } from 'react-router-dom';
import classes from 'styles/NotFoundPage.module.css'

const NotFoundPage: React.FC = () => {
  return (
    <div className={classes.main}>
      <span className={classes.number}>404</span>
      <h1 className={classes.title}>Страница не найдена</h1>
      <p className={classes.subtitle}>Неправильно набран адрес, или такой страницы на&nbsp;сайте больше не&nbsp;существует.</p>
      <Link to='/'>
        <span className={classes.link}>На главную</span>
      </Link>
    </div>
  );
}

export default NotFoundPage;