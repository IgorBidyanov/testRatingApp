import React from 'react';
import classes from 'components/UI/preloader/Preloader.module.css'
import loaderImg from 'assets/img/light-preloader.gif'

const Preloader: React.FC = () => {
  return (
    <div className={classes.preloader}>
      <img src={loaderImg} className={classes.preloader__icon} alt="loading..." />
    </div>
  );
}

export default Preloader;