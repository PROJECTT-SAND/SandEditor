import style from './Viewport.module.scss';
import { useRef, useEffect } from 'react';
import { useBoundStore } from '@/store'
import { createScene } from '@/system/renderer';

export default function Viewer() {
  const { mouseIsEnterViewer, setMouseIsEnterViewer, zoom, setZoom, cameraPos, mousePos, optionState, setOptionState } = useBoundStore();
  const canvasElem = useRef<HTMLCanvasElement>(null);
  const wrapperElem = useRef<HTMLDivElement>(null);
  const bgElem = useRef<HTMLDivElement>(null);

  // Create scene
  useEffect(() => {
    if (canvasElem.current == null || wrapperElem.current == null) return;
    createScene(canvasElem.current, wrapperElem.current);
  }, [])

  // Fullscreen
  useEffect(() => {
    let elem = document.getElementById("root");

    if (!wrapperElem.current || !elem) return;

    if (optionState.FullScreen) {
      if (document.fullscreenElement) return;
      elem.requestFullscreen();
    } else {
      if (!document.fullscreenElement) return;
      document.exitFullscreen();
    }
  }, [optionState.FullScreen])

  // Click outside => Exit fullscreen
  useEffect(() => {
    if (!bgElem.current) return;

    bgElem.current.addEventListener('click', (e) => {
      // @ts-ignore
      if (e.target.id != "bgElem") return;

      const { optionState, setOptionState } = useBoundStore.getState();
      if (!optionState.FullScreen) return;
      setOptionState({ ...optionState, FullScreen: false });
    }, {})
  }, [])

  return (
    <div
      className={`${style.viewer_wrap} ${optionState.FullScreen ? style.viewer_wrap_fullscreen : ''}`}
      id="bgElem"
      ref={bgElem}
    >
      <div className={`${style.viewer} ${optionState.FullScreen ? style.viewer_fullscreen : ''}`}
        ref={wrapperElem}
        onMouseEnter={() => setMouseIsEnterViewer(true)}
        onMouseLeave={() => setMouseIsEnterViewer(false)}
      >
        {mouseIsEnterViewer ?
          <div className={style.cameraPos}>
            <div className={style.prop}><div className={style.propName}>Camera X :</div>{Math.round(cameraPos.x * 100) / 100}</div>
            <div className={style.prop}><div className={style.propName}>Camera Y :</div>{Math.round(cameraPos.y * 100) / 100}</div>
            <div className={style.prop}><div className={style.propName}>Mouse X :</div>{Math.round(mousePos.x * 100) / 100}</div>
            <div className={style.prop}><div className={style.propName}>Mouse Y :</div>{Math.round(mousePos.y * 100) / 100}</div>
            <div className={style.prop}><div className={style.propName}>Zoom :</div>{zoom} x</div>
          </div>
          : ''
        }

        <canvas className={style.canvas} ref={canvasElem}></canvas>
      </div>
    </div>
  );
}