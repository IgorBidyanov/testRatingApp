import NewEmployerForm from 'components/NewEmployerForm';
import BackBtn from 'components/UI/backBtn/BackBtn';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployerAction, getEmployersAction, updateEmployerAction, updateEmployersRatingAction } from 'stores/employers/actions';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { IEmployer, IEmployerResponse, INewEmployer, IUpdateEmployersRatingPayload } from 'types/EmployersTypes';

type TEmployerKey = keyof IEmployer
type TEmployerResponse = keyof IEmployerResponse

const EditEmployerPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const { employer, employers } = useAppSelector(state => state.employers)
  const token = Cookies.get('ratingAppToken')
  const { id } = useParams()

  const updateRatingEmployers = async (newEmployer: INewEmployer) => {
    if (employers && employer && token) {
      let payload: IUpdateEmployersRatingPayload = {}
      let filteredEmployers
      
      if (employer?.rating > +newEmployer.rating) {
        filteredEmployers = employers.filter(person => (person.rating >= +newEmployer.rating) && (person.id !== employer.id) && (person.rating < employer.rating))
        
        for (let i = 0; i < filteredEmployers.length; i++) {
          const item = filteredEmployers[i];
          payload[`${item.id}/rating`] = +item.rating + 1;
        }
      } else if (employer?.rating < +newEmployer.rating) {
        filteredEmployers = employers.filter(person => (person.rating <= +newEmployer.rating) && (person.id !== employer.id) && (person.rating > employer.rating))
        
        for (let i = 0; i < filteredEmployers.length; i++) {
          const item = filteredEmployers[i];
          payload[`${item.id}/rating`] = +item.rating - 1;
        }
      }

      const isUpdateRating = await dispatch(updateEmployersRatingAction({ payload, token }))
      return isUpdateRating.meta.requestStatus
    }
  }

  const editEmployer = async (newEmployer: INewEmployer) => {
    if (employer && token) {
      const full_name = (newEmployer.second_name[0].toUpperCase() + newEmployer.second_name.toLowerCase().slice(1)) + ' ' + (newEmployer.first_name[0].toUpperCase() + newEmployer.first_name.toLowerCase().slice(1)) + ' ' + (newEmployer.patronymic[0].toUpperCase() + newEmployer.patronymic.toLowerCase().slice(1))
      const tmpEmployer: Partial<IEmployerResponse> = {
        date_of_birth: newEmployer.date_of_birth,
        department: newEmployer.department,
        full_name: full_name,
        phone: newEmployer.phone,
        rating: +newEmployer.rating
      }
      
      for (let key in tmpEmployer) {
        if (tmpEmployer[key as TEmployerResponse] === employer[key as TEmployerKey]) {
          delete tmpEmployer[key as TEmployerResponse]
        }
      }

      const updateEmployerPayload = { createdEmployer: tmpEmployer, id: employer.id }

      const isUpdateEmployer = await dispatch(updateEmployerAction({ payload: updateEmployerPayload, token }))
      if (isUpdateEmployer.meta.requestStatus === 'fulfilled' && employers && employer?.rating && employer.rating !== +newEmployer.rating) {
        const updateRating = await updateRatingEmployers(newEmployer)
        return updateRating
      } else return isUpdateEmployer.meta.requestStatus
    }
  }

  useEffect(() => {
    if (id && token) {
      dispatch(getEmployerAction({ id, token }))
    }
    dispatch(getEmployersAction())
  }, [id, dispatch, token])

  return (
    <>
      <NewEmployerForm
        employer={employer || undefined}
        onSubmitForm={editEmployer}
        editEmployer
      />

      <BackBtn />
    </>
  );
}

export default EditEmployerPage;