import NewEmployerForm from 'components/NewEmployerForm';
import BackBtn from 'components/UI/backBtn/BackBtn';
import React, { useEffect } from 'react';
import { addNewEmployerAction, getEmployersAction, updateEmployersRatingAction } from 'stores/employers/actions';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { IEmployerResponse, INewEmployer, IUpdateEmployersRatingPayload } from 'types/EmployersTypes';

const AddNewEmployerPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const { employers } = useAppSelector(state => state.employers)

  const updateRatingEmployers = async (newEmployer: INewEmployer) => {
    if (employers) {
      let payload: IUpdateEmployersRatingPayload = {}
      const filteredEmployers = employers.filter(employer => employer.rating >= +newEmployer.rating)
      
      for (let i = 0; i < filteredEmployers.length; i++) {
        const item = filteredEmployers[i];
        payload[`${item.id}/rating`] = +item.rating + 1;
      }
      const isUpdateRating = await dispatch(updateEmployersRatingAction(payload))
      return isUpdateRating.meta.requestStatus
    }
  }

  const addNewEmployer = async (newEmployer: INewEmployer) => {
    const full_name = (newEmployer.second_name[0].toUpperCase() + newEmployer.second_name.toLowerCase().slice(1)) + ' ' + (newEmployer.first_name[0].toUpperCase() + newEmployer.first_name.toLowerCase().slice(1)) + ' ' + (newEmployer.patronymic[0].toUpperCase() + newEmployer.patronymic.toLowerCase().slice(1))
    let createdEmployer: IEmployerResponse = {
      date_of_birth: newEmployer.date_of_birth,
      department: newEmployer.department,
      full_name: full_name,
      phone: newEmployer.phone,
      rating: +newEmployer.rating
    }

    const isAddedEmployer = await dispatch(addNewEmployerAction(createdEmployer))
    if (isAddedEmployer.meta.requestStatus === 'fulfilled' && employers?.length && +newEmployer.rating <= employers?.length) {
      const updateRating = await updateRatingEmployers(newEmployer)
      return updateRating
    } else return isAddedEmployer.meta.requestStatus
  }

  useEffect(() => {
    dispatch(getEmployersAction())
  }, [dispatch])

  return (
    <>
      <NewEmployerForm onSubmitForm={addNewEmployer} />

      <BackBtn />
    </>
  );
}

export default AddNewEmployerPage;