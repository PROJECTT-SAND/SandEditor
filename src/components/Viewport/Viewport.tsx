import style from './Viewport.module.scss';
import { useRef, useEffect } from 'react';
import { useBoundStore } from '@/store'
import { createScene, initScene } from './threejs';

export default function Viewer() {
  const { setMouseIsEnterViewer, objectDatas } = useBoundStore();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current == null) return;

    createScene(canvas.current);
    initScene();
  }, [])

  return (
    <div className={style.viewer}
      onMouseEnter={() => setMouseIsEnterViewer(true)}
      onMouseLeave={() => setMouseIsEnterViewer(false)}
    >
      <canvas className={style.canvas} ref={canvas}></canvas>
    </div>
  );
}