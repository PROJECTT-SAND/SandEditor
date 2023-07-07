import style from './Viewport.module.scss';
import { useRef, useEffect } from 'react';
import { useBoundStore } from '@/store'
import { createScene } from '@/system/threejs';

export default function Viewer() {
  const { mouseIsEnterViewer, setMouseIsEnterViewer, zoom, setZoom, cameraPos, optionState, setOptionState } = useBoundStore();
  const canvasElem = useRef<HTMLCanvasElement>(null);
  const wrapperElem = useRef<HTMLDivElement>(null);
  const bgElem = useRef<HTMLDivElement>(null);

  // Create scene
  useEffect(() => {
    if (canvasElem.current == null || wrapperElem.current == null) return;
    createScene(canvasElem.current, wrapperElem.current);
  }, [])

  // Click outside => Exit fullscreen
  useEffect(() => {
    if (!bgElem.current) return;

    bgElem.current.addEventListener('click', (e) => {
      // @ts-ignore
      if (e.target.id != "bgElem") return;

      const { optionState, setOptionState } = useBoundStore.getState();
      if (!optionState.fullScreen) return;
      setOptionState({ ...optionState, fullScreen: false });
    }, {})
  }, [])

  return (
    <div
      className={`${style.viewer_wrap} ${optionState.fullScreen ? style.viewer_wrap_fullscreen : ''}`}
      id="bgElem"
      ref={bgElem}
    >
      <div className={`${style.viewer} ${optionState.fullScreen ? style.viewer_fullscreen : ''}`}
        ref={wrapperElem}
        onMouseEnter={() => setMouseIsEnterViewer(true)}
        onMouseLeave={() => setMouseIsEnterViewer(false)}
      >
        {mouseIsEnterViewer ?
          <div className={style.cameraPos}>
            <div className={style.prop}><div className={style.propName}>Camera X :</div>{Math.round(cameraPos.x * 100) / 100}</div>
            <div className={style.prop}><div className={style.propName}>Camera Y :</div>{Math.round(cameraPos.y * 100) / 100}</div>
            <div className={style.prop}><div className={style.propName}>Zoom :</div>{zoom} x</div>
          </div>
          : ''
        }

        <canvas className={style.canvas} ref={canvasElem}></canvas>
      </div>
    </div>
  );
}