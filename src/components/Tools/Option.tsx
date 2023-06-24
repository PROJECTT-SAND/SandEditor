import style from './Tools.module.scss';
import React, { useState } from 'react';
import { useBoundStore } from '@/store'

const Option: React.FC<{
  style_: string;
  optionEnum: number;
  children: React.ReactNode;
}> = ({ style_, optionEnum, children }) => {
  const { optionState, setOptionState } = useBoundStore();
  let aaaa = ['showGrid', 'fullScreen'];
  // tlqkf 인덱싱해야됨 ㅅㅄㅄㅄㅄㅄㅂ
  const currentState = optionState[aaaa[optionEnum]];

  const setOption = () => {
    setOptionState({ ...optionState, [aaaa[optionEnum]]: !currentState });
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