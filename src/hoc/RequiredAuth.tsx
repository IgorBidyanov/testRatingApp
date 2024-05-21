import Cookies from 'js-cookie';
import React, { PropsWithChildren, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'stores/hooks';

const RequiredAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const navigation = useNavigate() as NavigateFunction
  const { admin } = useAppSelector(state => state.auth)
  const token = Cookies.get('ratingAppToken')
  
  useEffect(() => {
    if (!admin && !token) {
      navigation('/')
    }
  }, [admin, token])
  
  return (
    <>{ children }</>
  );
}

export default RequiredAuth;