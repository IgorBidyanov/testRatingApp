import React from 'react';
import classes from 'styles/DeleteEmployer.module.css'
import MyButton from './UI/button/MyButton';

interface IProps {
  toggleActiveModal: () => void
  deleteEmployer: () => void
}

const DeleteEmployer: React.FC<IProps> = ({ toggleActiveModal, deleteEmployer }) => {
  return (
    <div className={classes.deleteEmployer}>
    <h2 className={classes.deleteEmployer__title}>Вы уверены, что хотите удалить сотрудника?</h2>

    <div className={classes.deleteEmployer__btns}>
      <MyButton removeBtn onClick={deleteEmployer}>Удалить</MyButton>
      
      <MyButton cancelBtn onClick={toggleActiveModal}>Отмена</MyButton>
    </div>
  </div>
  );
}

export default DeleteEmployer;