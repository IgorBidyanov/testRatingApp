import React, { useEffect, useMemo, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { deleteEmployerAction, getEmployerAction, updateEmployersRatingAction } from 'stores/employers/actions';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import classes from 'styles/EmployerProfile.module.css'
import MyButton from './UI/button/MyButton';
import MyModal from './UI/modal/MyModal';
import DeleteEmployer from './DeleteEmployer';
import { IUpdateEmployersRatingPayload } from 'types/EmployersTypes';
import Cookies from 'js-cookie';

const EmployerProfile: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigate() as NavigateFunction

  const { employer, employers } = useAppSelector(state => state.employers)
  const token = Cookies.get('ratingAppToken')
  const { id } = useParams()

  const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false)

  const prizesStyles = useMemo(() => {
    if (employer?.rating === 1) {
      return classes.profile__firstPlace
    } else if (employer?.rating === 2) {
      return classes.profile__secondPlace
    } else if (employer?.rating === 3) {
      return classes.profile__thirdPlace
    } else return
  }, [employer])

  const phoneLink = useMemo(() => {
    return employer?.phone.split('-').join('')
  }, [employer?.phone])

  const navigateToEdit = () => {
    employer && navigation(`/employer/${employer.id}/edit`)
  }

  const toggleDeleteModal = () => {
    setDeleteModalActive(prevState => !prevState)
  }

  const updateRatingEmployers = async () => {
    if (employers && employer && token) {
      let payload: IUpdateEmployersRatingPayload = {}
      const filteredEmployers = employers.filter(person => (person.rating > employer.rating) && (person.id !== employer.id))
      
      for (let i = 0; i < filteredEmployers.length; i++) {
        const item = filteredEmployers[i];
        payload[`${item.id}/rating`] = +item.rating - 1;
      }

      await dispatch(updateEmployersRatingAction({ payload, token })).then(() => navigation('/', { replace: true }))
    }
  }

  const deleteEmployer = async () => {
    if (employer && token) {
      await dispatch(deleteEmployerAction({ id: employer.id, token })).then(result => {
        if (result.meta.requestStatus === 'fulfilled') {
          updateRatingEmployers()
        }
      })
    }
  }

  useEffect(() => {
    if (id && token) {
      dispatch(getEmployerAction({ id, token }))
    }
  }, [id, dispatch, token])
  
  return (
    <>
      <h2 className={ classes.profile__name }>{ employer?.full_name }</h2>

      <ul className={ classes.profile__list }>
        <li>Позиция в рейтинге:
          <span className={ prizesStyles }>{ ` ${ employer?.rating }` }</span>
        </li>
        
        <li>Отдел: { employer?.department }</li>
        
        <li>
          <a href={`tel:${phoneLink}`}>
            Телефон: { employer?.phone }
          </a>
        </li>
        
        <li>Дата рождения: { employer?.date_of_birth }</li>
      </ul>

      <div className={classes.profile__buttons}>
        <MyButton 
          onClick={navigateToEdit}
          disabled={!employer}
        >
            Редактировать
        </MyButton>

        <MyButton 
          removeBtn
          disabled={!employer}
          onClick={toggleDeleteModal}
        >
            Удалить
        </MyButton>
      </div>

      {deleteModalActive && (
        <MyModal
          setActive={toggleDeleteModal}
        >
          <DeleteEmployer deleteEmployer={deleteEmployer} toggleActiveModal={toggleDeleteModal} />
        </MyModal>)
      }
    </>
  );
}

export default EmployerProfile;