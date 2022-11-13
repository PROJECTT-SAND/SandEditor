import { useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';
import style from './Console.module.scss';
import Window from '../Window/Window';
import { system } from '../../system';
import useStore from '../../store';

export default function Console() {
  const logs = useStore(store => Object.values(store.logs), shallow);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollTop = 100;
    // console.log("as")
  }, []);

  function Console() {
    let result: any = [];

    logs.map((item: any, key) => {
      if(item.kind === 'command') {
        result.push (
          <div key={key}>
            <span className={style.target}>&#62;</span>
            {item.content}
          </div>
        );
      } else if(item.kind === 'error') {
        result.push (
          <div key={key} className={style.errer}>{item.content}</div>
        );
      } else if(item.kind === 'warning') {
        result.push (
          <div key={key} className={style.warning}>{item.content}</div>
        );
      } else if(item.kind === 'text') {
        result.push (
          <div key={key}>{item.content}</div>
        );
      }
    })

    return (
      <div className={style.console_wrap} ref={ref}>
        <code className={style.console}>
          {result}
          <div className={style.consoleInput_wrap}>
            <span className={style.target}>&#62;</span>
            <input
              className={style.consoleInput}
              onKeyDown={(e)=>{
                if(e.key === 'Enter') {
                  system.run(e.target.value);
                  e.target.value = "";
                  
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
      <Console/>
    </Window>
  );
}


export const sysConsole = {
  command: (Props: any) => {
    let logsValue = useStore.getState().logs;
    
    logsValue.push({
      kind: 'command',
      content: Props,
      time: new Date()
    });

    useStore.setState({
        logs: logsValue,
        ...useStore
    });
  },
  text: (Props: any) => {
    let logsValue = useStore.getState().logs;
    
    logsValue.push({
      kind: 'text',
      content: Props,
      time: new Date()
    });

    useStore.setState({
      logs: logsValue,
      ...useStore
  });
  },
  warning: (Props: any) => {
    let logsValue = useStore.getState().logs;
    
    logsValue.push({
      kind: 'warning',
      content: Props,
      time: new Date()
    });

    useStore.setState({
      logs: logsValue,
      ...useStore
    });
  },
  error: (Props: any) => {
    let logsValue = useStore.getState().logs;
    
    logsValue.push({
      kind: 'error',
      content: Props,
      time: new Date()
    });

    useStore.setState({
      logs: logsValue,
      ...useStore
    });
  },
  endCalculation: () => {
    // 연산 끝
  }
}