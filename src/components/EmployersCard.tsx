import React, { useCallback, useMemo } from 'react';
import { IEmployer } from 'types/EmployersTypes';
import classes from 'styles/EmployersCard.module.css'
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface IProps {
  employer: IEmployer
}

const EmployersCard: React.FC<IProps> = ({ employer }) => {
  const navigation = useNavigate() as NavigateFunction

  const cardStyle = useMemo(() => {
    let classNames = [classes.card]
    if (employer.rating === 1) {
      classNames.push(classes.card__firstPlace)
    } else if (employer.rating === 2) {
      classNames.push(classes.card__secondPlace)
    } else if (employer.rating === 3) {
      classNames.push(classes.card__thirdPlace)
    }
    return classNames.join(' ')
  }, [employer])

  const chooseEmployer = useCallback(() => {
    navigation(`/employer/${employer.id}`);
  }, [employer.id, navigation])

  return (
    <div className={cardStyle} onClick={chooseEmployer}>
      <div className={classes.card__header}>
        <h2 className={classes.card__headerText}>{employer.shortened_name}</h2>
        <div className={classes.card__headerText}>№ {employer.rating}</div>
      </div>

      <ul className={classes.card__body}>
        <li className={classes.card__bodyItem}>Отдел: {employer.department}</li>
        <li className={classes.card__bodyItem}>Телефон: {employer.phone}</li>
        <li className={classes.card__bodyItem}>Дата рождения: {employer.date_of_birth}</li>
      </ul>
    </div>
  );
}

export default EmployersCard;