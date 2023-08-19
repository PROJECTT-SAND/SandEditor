import style from './Tools.module.scss';
import React, { useState } from 'react';
import { useBoundStore } from '@/store'
import { OPTION } from '@/constants';

const Option: React.FC<{
  style_: string;
  optionEnum: OPTION;
  children: React.ReactNode;
}> = ({ style_, optionEnum, children }) => {
  const { optionState, setOptionState } = useBoundStore();
  const currentState = optionState[optionEnum];

  const setOption = () => {
    setOptionState({ ...optionState, [optionEnum]: !currentState });
  }

  return (
    <div className={style_}>
      <button
        className={currentState ? style.option_active : ""}
        onClick={setOption}>

        {children}
      </button>
    </div>
  )

}

export default Option