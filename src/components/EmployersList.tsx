import React from 'react';
import { useAppSelector } from 'stores/hooks';
import EmployersCard from './EmployersCard';
import classes from 'styles/EmployersList.module.css'

const EmployersList: React.FC = () => {

  const { employers } = useAppSelector(state => state.employers)

  return (
    <ul className={classes.employersList}>
      {employers && employers.map(employer => (
        <EmployersCard employer={employer} key={employer.id} />
      ))}
    </ul>
  );
}

export default EmployersList;