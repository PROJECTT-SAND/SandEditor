import style from './Toolbar.module.scss';
import React, { useState } from 'react';

const Option: React.FC<{
  style_: string;
  optionEnum: number;
  children: React.ReactNode;
}> = ({ style_, optionEnum, children }) => {
  const [optionsState, setOptionsState] = useState([false, false]);
  const isActive = optionsState[optionEnum];

  const setOption = () => {
    let value = [...optionsState];
    value[optionEnum] = !value[optionEnum];

    setOptionsState(value);
  }

  return (
    <div className={style_}>
      <button
        className={isActive ? style.option_active : ""}
        onClick={setOption}>

        {children}
      </button>
    </div>
  )

}

export default Option