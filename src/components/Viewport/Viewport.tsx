import style from './Viewport.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useBoundStore } from '@/store'
import { createScene, pointerMoveEvent, clickEvent, setStoreValue } from './threejs';

export default function Viewer() {
  const { setMouseIsEnterViewer } = useBoundStore();
  const canvas = useRef<HTMLCanvasElement>(null);

  setStoreValue(useBoundStore());

  useEffect(() => {
    if (canvas.current == null) return;

    createScene(canvas.current);
    canvas.current.addEventListener('pointermove', (e) => pointerMoveEvent(e))
    canvas.current.addEventListener('click', (e) => clickEvent(e))
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