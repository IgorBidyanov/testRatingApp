import React, { SelectHTMLAttributes } from 'react';
import classes from './MySelect.module.css'

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  defaultValue: string
}

const MySelect: React.FC<IProps> = ({ options, defaultValue, ...restProps }) => {

  return (
    <div className={classes.select}>
      <select {...restProps}>
        <option disabled>{ defaultValue }</option>

        { options.map(option => (
          <option key={option} value={ option }>{ option }</option>
        )) }
      </select>
    </div>
  );
}

export default MySelect;