import style from './Viewport.module.scss';
import { useRef, useEffect } from 'react';
import { useBoundStore } from '@/store'
import { createScene } from '@/system/threejs';

export default function Viewer() {
  const { mouseIsEnterViewer, setMouseIsEnterViewer, zoom, setZoom, cameraPos } = useBoundStore();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current == null) return;
    createScene(canvas.current);
  }, [])

  const onWheel = (e: React.WheelEvent) => {
    setZoom(Math.round(zoom * (1 + ((e.deltaY / Math.abs(e.deltaY)) / 6) * -1) * 100) / 100);
  }

  return (
    <div className={style.viewer}
      onMouseEnter={() => setMouseIsEnterViewer(true)}
      onMouseLeave={() => setMouseIsEnterViewer(false)}
      onWheel={onWheel}
    >
      {mouseIsEnterViewer ?
        <div className={style.cameraPos}>
          <div className={style.prop}><div className={style.propName}>Camera X :</div>{Math.round(cameraPos.x * 100) / 100} px</div>
          <div className={style.prop}><div className={style.propName}>Camera Y :</div>{Math.round(cameraPos.y * 100) / 100} px</div>
          <div className={style.prop}><div className={style.propName}>Zoom :</div>{zoom} x</div>
        </div>
        : ''
      }

      <canvas className={style.canvas} ref={canvas}></canvas>
    </div>
  );
}