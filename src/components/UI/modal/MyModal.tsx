import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react'
import classes from './MyModal.module.css'

type IProps = PropsWithChildren<{
  setActive: (val: boolean) => void
}>

const MyModal: React.FC<IProps> = ({ setActive, children }) => {
  const closeModal = (val: boolean) => {
    setActive(val)
  }

  useEffect(() => {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px'
    document.body.style.paddingRight = paddingOffset
    document.body.classList.add('modal-open')

    return () => {
      document.body.style.paddingRight = '0'
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <div className={classes.modal} onClick={() => closeModal(false)}>
      <div className={classes.modal__content} onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default MyModal;