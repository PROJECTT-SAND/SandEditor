import style from './Toolbar.module.scss';
import React from 'react';
import { useBoundStore } from '../../store'

const PlayerButton: React.FC<{
  PlayerButtonEnum: any;
  style_: string;
  func: any;
  children: React.ReactNode;
}> = ({ PlayerButtonEnum, style_, func, children }) => {
  const store = useBoundStore();
  const ButtonState = [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [2, 1, 1],
    [1, 2, 1],
    [0, 0, 2],
  ]

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