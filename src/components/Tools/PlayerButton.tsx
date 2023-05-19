import style from './Toolbar.module.scss';
import React from 'react';
import { useBoundStore } from '@/store'
import {ButtonState} from '@/constants'

const PlayerButton: React.FC<{
  PlayerButtonEnum: any;
  style_: string;
  func: any;
  children: React.ReactNode;
}> = ({ PlayerButtonEnum, style_, func, children }) => {
  const store = useBoundStore();

  return (
    <button
      data-state={ButtonState[store.currentLifeCycle][PlayerButtonEnum]}
      className={style_}
      onClick={func}>

      {children}
    </button>
  )
}

export default PlayerButton