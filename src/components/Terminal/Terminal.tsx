import { useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';
import style from './Terminal.module.scss';
import Window from '../Window/Window';
import { system } from '../../system';
import { useBoundStore } from '../../store';

export default function Console() {
  const logs = useBoundStore(store => Object.values(store.logs), shallow);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;;
  }, [logs]);

  function Console() {
    let result: any = [];

    logs.map((item: any, key) => {
      if (item.kind === 'command') {
        result.push(
          <div key={key}>
            <span className={style.target}>&#62;</span>
            {item.content}
          </div>
        );
      } else if (item.kind === 'error') {
        result.push(
          <div key={key} className={style.errer}>{item.content}</div>
        );
      } else if (item.kind === 'warning') {
        result.push(
          <div key={key} className={style.warning}>{item.content}</div>
        );
      } else if (item.kind === 'text') {
        result.push(
          <div key={key}>{item.content}</div>
        );
      }
    })

    return (
      <div className={style.console_wrap} ref={ref}>
        <code className={style.console}>
          {result}
          <div className={style.prompt_wrap}>
            <span className={style.target}>&#62;</span>
            <input
              className={style.prompt}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  system.run(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}>
            </input>
          </div>
        </code>
      </div>
    );
  }

  return (
    <Window>
      <div className={style.topBar}>
        <button className={style.topBar_addObject}></button>
        <i>Console</i>
        <button className={style.topBar_search}></button>
      </div>
      <Console />
    </Window>
  );
}