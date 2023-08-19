import style from './Tools.module.scss';
import React from 'react';
import { useBoundStore } from '@/store'
import { ButtonLifeCycle, PLAYER } from '@/constants'

const PlayerButton: React.FC<{
  PlayerButtonEnum: PLAYER;
  style_: string;
  func: any;
  children: React.ReactNode;
}> = ({ PlayerButtonEnum, style_, func, children }) => {
  const store = useBoundStore();

  return (
    <button
      data-state={ButtonLifeCycle[store.currentLifeCycle][PlayerButtonEnum]}
      className={style_}
      onClick={func}>

      {children}
    </button>
  )
}

export default PlayerButton