import style from './Tools.module.scss';
import { useEffect, useState } from 'react';
import { useBoundStore } from '@/store'

export default function PositionIndicator() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const store = useBoundStore();

  useEffect(() => {
    document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
      setMouseX(x - 25);
      setMouseY(y - 25);
    })
  }, []);

  if (store.mouseIsEnterViewer) {
    return (
      <div className={style.positionIndicator}>
        <div>
          <span>X: </span>
          <i>{mouseX}</i>
        </div>
        <div>
          <span>Y: </span>
          <i>{mouseY}</i>
        </div>
      </div>
    );
  } else {
    return (null);
  }
}