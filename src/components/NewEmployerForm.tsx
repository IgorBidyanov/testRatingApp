import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MyInput from './UI/input/MyInput';
import { IEmployer, INewEmployer, TDepartment } from 'types/EmployersTypes';
import MySelect from './UI/select/MySelect';
import { useAppSelector } from 'stores/hooks';
import MyButton from './UI/button/MyButton';
import classes from 'styles/NewEmployerForm.module.css'
import { useMask } from '@react-input/mask';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface IProps {
  employer?: IEmployer
  onSubmitForm: (val: INewEmployer) => Promise<string | undefined>
  editEmployer? : boolean
}

type TNewEmployerKey = keyof INewEmployer

interface IFormErrors {
  second_name?: string
  first_name?: string
  patronymic?: string
  date_of_birth?: string
  phone?: string
  department?: string
  rating?: string
}

type TFormErrorsKey = keyof IFormErrors

const NewEmployerForm: React.FC<IProps> = ({ employer, onSubmitForm, editEmployer }) => {

  const navigation = useNavigate() as NavigateFunction
  
  const { employers, error } = useAppSelector(state => state.employers)
  
  const phoneMask = useMask({ mask: '+7-___-___-__-__', replacement: { _: /\d/ } })
  
  const [newEmployer, setNewEmployer] = useState<INewEmployer>({
    second_name: '',
    first_name: '',
    patronymic: '',
    date_of_birth: '',
    phone: '',
    department: '',
    rating: ''
  })
  const [formErrors, setFormErrors] = useState<IFormErrors>({})
  const [activeBtn, setActiveBtn] = useState<boolean>(true)
  
  const disabledSaveBtn = useMemo(() => {
    for (let key in newEmployer) {
      if (!newEmployer[key as TNewEmployerKey]) {
        return true
      }
    }

    for (let key in formErrors) {
      if (formErrors[key as TFormErrorsKey]) {
        return true
      }
    }
    return false
  }, [newEmployer, formErrors])


  const changeNewEmployer = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: TNewEmployerKey) => {
    setNewEmployer({ ...newEmployer, [key]: event.target.value })
    !activeBtn && setActiveBtn(true)
    if (formErrors[key]) {
      let copyErrors = { ...formErrors }
      delete copyErrors[key]
      setFormErrors(copyErrors)
    }
  }, [newEmployer, activeBtn, formErrors])

  const departmentOptions: TDepartment[] = ['Отдел разработки', 'Отдел маркетинга', 'Отдел продаж', 'Отдел качества', 'Отдел поддержки']
  
  const ratingOptions = useMemo(() => {
    return employers ? Array.from({ length: editEmployer ? employers.length : employers.length + 1 }, (_, index) => String(index + 1)) : ['1']
  }, [editEmployer, employers]);

  const checkForm = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormErrors({})
    setActiveBtn(false)
    let formValid = true
    const patternName = /^[а-яА-Я]{2,}$/
    const patternPatronymic = /^[а-яА-Я]{6,}$/

    if (!patternName.test(newEmployer.first_name)) {
      formValid = false
      setActiveBtn(false)
      setFormErrors(prevState => ({ ...prevState, first_name: 'Введите корректное имя' }))
    }
    
    if (!patternName.test(newEmployer.second_name)) {
      formValid = false
      setActiveBtn(false)
      setFormErrors(prevState => ({ ...prevState, second_name: 'Введите корректную фамилию' }))
    }
    
    if (!patternPatronymic.test(newEmployer.patronymic)) {
      formValid = false
      setActiveBtn(false)
      setFormErrors(prevState => ({ ...prevState, patronymic: 'Введите корректное отчество' }))
    }

    if (newEmployer.date_of_birth.length < 10) {
      formValid = false
      setActiveBtn(false)
      setFormErrors(prevState => ({ ...prevState, date_of_birth: 'Выберите дату рождения' }))
    }
    
    if (newEmployer.phone.length < 16) {
      formValid = false
      setActiveBtn(false)
      setFormErrors(prevState => ({ ...prevState, phone: 'Введите номер телефона' }))
    }
    
    if (!newEmployer.department) {
      formValid = false
      setActiveBtn(false)
      setFormErrors(prevState => ({ ...prevState, department: 'Выберите отдел' }))
    }
    
    if (!newEmployer.rating) {
      formValid = false
      setActiveBtn(false)
      setFormErrors(prevState => ({ ...prevState, rating: 'выберите позицию в рейтинге' }))
    }

    if (formValid) {
      const isSubmit = await onSubmitForm(newEmployer)

      if (isSubmit === 'fulfilled') {
        setFormErrors({})
        let copyEmployer = { ...newEmployer }
        for (let key in copyEmployer) {
          copyEmployer[key as TNewEmployerKey] = ''
        }
        setNewEmployer(copyEmployer)
      }
  
      if (isSubmit === 'fulfilled' && employer) {
        navigation('/')
      }
    }
  }

  useEffect(() => {
    if (employer) {
      let nameArr = employer.full_name.split(' ')
      
      let newEmployer = {
        second_name: nameArr[0],
        first_name: nameArr[1],
        patronymic: nameArr[2],
        date_of_birth: employer.date_of_birth,
        phone: employer.phone,
        department: employer.department,
        rating: employer.rating.toString()
      }
      setNewEmployer(newEmployer)
    }
  }, [employer])

  return (
    <form className={classes.newEmployer__form}  onSubmit={checkForm}>
      <div className="inputWrapper">
        <MyInput 
          label='Введите фамилию'
          value={newEmployer.second_name}
          onChange={(event) => changeNewEmployer(event, 'second_name')}
          placeholder='Иванов'
          isError={!!formErrors.second_name || !!error}
        />

        <p className="input__errorText">{formErrors.second_name}</p>
      </div>
      
      <div className="inputWrapper">
        <MyInput
          label='Введите имя'
          value={newEmployer.first_name}
          onChange={(event) => changeNewEmployer(event, 'first_name')}
          placeholder='Иван'
          isError={!!formErrors.first_name || !!error}
        />

        <p className="input__errorText">{formErrors.first_name}</p>
      </div>
      
      <div className="inputWrapper">
        <MyInput
          label='Введите отчество'
          value={newEmployer.patronymic}
          onChange={(event) => changeNewEmployer(event, 'patronymic')}
          placeholder='Иванович'
          isError={!!formErrors.patronymic || !!error}
        />

        <p className="input__errorText">{formErrors.patronymic}</p>
      </div>
      
      <div className="inputWrapper">
        <MyInput
          label='Введите дату рождения'
          value={newEmployer.date_of_birth}
          onChange={(event) => changeNewEmployer(event, 'date_of_birth')}
          placeholder='дд.мм.гггг'
          type='date'
          isError={!!formErrors.date_of_birth || !!error}
        />

        <p className="input__errorText">{formErrors.date_of_birth}</p>
      </div>
      
      <div className="inputWrapper">
        <MyInput
          label='Введите телефон'
          value={newEmployer.phone}
          onChange={(event) => changeNewEmployer(event, 'phone')}
          placeholder='+7-XXX-XXX-XX-XX'
          type='tel'
          innerRef={phoneMask}
          isError={!!formErrors.phone || !!error}
        />

        <p className="input__errorText">{formErrors.phone}</p>
      </div>

      <div className="inputWrapper">
        <MySelect
          defaultValue='Выберите отдел'
          options={departmentOptions}
          value={newEmployer.department || 'Выберите отдел'}
          onChange={(event) => changeNewEmployer(event, 'department')}
        />

        <p className="input__errorText">{formErrors.department}</p>
      </div>
      
      <div className="inputWrapper">
        <MySelect
          defaultValue='Выберите позицию в рейтинге'
          options={ratingOptions}
          value={newEmployer.rating || 'Выберите позицию в рейтинге'}
          onChange={(event) => changeNewEmployer(event, 'rating')}
        />

        <p className="input__errorText">{formErrors.rating}</p>
      </div>

      <p className="input__errorText">{error}</p>

      <MyButton type='submit' disabled={disabledSaveBtn || !activeBtn}>Сохранить</MyButton>
    </form>
  );
}

export default NewEmployerForm;