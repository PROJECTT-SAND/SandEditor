import style from './Tools.module.scss';
import React, { useEffect, useState } from 'react';
import { useBoundStore } from '@/store'

const Tool: React.FC<{
  style_: string;
  toolEnum: number;
  children: React.ReactNode;
}> = ({ style_, toolEnum, children }) => {
  const { toolState, setToolState } = useBoundStore();
  const isToolSelected = toolState === toolEnum;


  const setTool = () => {
    if (toolState !== toolEnum) {
      setToolState(toolEnum)
    }
  }

  return (
    <button
      className={`
            ${style_}
            ${isToolSelected ? style.tool_active : ""}
          `}
      onClick={setTool}>

      {children}
    </button>
  )
}

export default Tool