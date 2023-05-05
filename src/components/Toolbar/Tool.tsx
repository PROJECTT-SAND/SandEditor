import style from './Toolbar.module.scss';
import React, { useEffect, useState } from 'react';
import { useBoundStore } from '../../store'

const Tool: React.FC<{
  style_: string;
  toolEnum: number;
  children: React.ReactNode;
}> = ({ style_, toolEnum, children }) => {
  const store = useBoundStore();
  const [selectedTool, setSelectedTool] = useState(0);
  const isToolSelected = selectedTool === toolEnum;

  useEffect(() => {
    store.setToolState(selectedTool);
  }, [selectedTool]);

  const setTool = () => {
    if (selectedTool !== toolEnum) {
      setSelectedTool(toolEnum)
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