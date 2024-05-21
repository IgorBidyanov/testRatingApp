import EmployersList from 'components/EmployersList';
import React, { useEffect } from 'react';
import { getEmployersAction } from 'stores/employers/actions';
import { useAppDispatch } from 'stores/hooks';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEmployersAction())
  }, [dispatch])

  return (
    <>
      <EmployersList />
    </>
  );
}

export default MainPage;