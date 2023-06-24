import { useEffect, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import style from './Terminal.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { system } from '@/system/system';
import { useBoundStore } from '@/store';
import { commands } from '@/system/system';

import { ReactComponent as ErrorSVG } from '@assets/icon/terminal/error.svg';


export default function Console() {
  const logs = useBoundStore(store => Object.values(store.logs), shallow);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;;
  }, [logs]);

  const Prompt = () => {
    const [suggestions, setSuggestions] = useState<{ content: string, start: number, length: number }[]>([]);

    const parseCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
      let value = e.currentTarget.value.split(' ')
      let command = value[value.length - 1];
      let suggestion = [];
      let search = commands;
      for (const data of value) {
        if (search[data] === undefined) {
          break;
        }
        search = search[data];
      }

      for (const suggestionPrefix in search) {
        let idx = suggestionPrefix.indexOf(command);
        if (idx !== -1) { suggestion.push({ content: suggestionPrefix, start: idx, length: command.length }) };
      }


      setSuggestions(suggestion);
    }

    const executeCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && e.currentTarget.value !== '') {
        system.run(e.currentTarget.value);
        e.currentTarget.value = "";
      }
    }

    return (
      <div>
        <div className={style.suggest_wrap}>
          <div className={`${style.suggest} ${suggestions.length !== 0 ? style.suggest_show : ''}`}>
            {
              suggestions.map(({ content, start, length }, index) => {
                //className={style.suggest_item_select}
                return <div key={index}>{content}</div>
              })
            }
          </div>
        </div>
        <div className={style.prompt_wrap}>
          <span className={style.target}>&#62;</span>
          <input
            className={style.prompt}
            // onClick={}
            onInput={parseCommand}
            onKeyDown={executeCommand}
          >
          </input>
        </div>
      </div>
    )
  }

  function Console() {
    let result: any = [];

    logs.map((item: any, key) => {
      switch (item.kind) {
        case 'command':
          result.push(
            <div key={key}>
              <span className={`${style.target} ${style.target_old}`}>&#62;</span>
              {item.content}
            </div>
          );
          break;
        case 'error':
          result.push(
            <div key={key} className={style.errer}><ErrorSVG />{item.content}</div>
          );
          break;
        case 'warning':
          result.push(
            <div key={key} className={style.warning}>{item.content}</div>
          );
          break;
        case 'text':
          result.push(
            <div key={key} className={style.text}>{item.content}</div>
          );
          break;
      }
    })

    return (
      <div className={style.console_wrap} ref={ref}>
        <code className={style.console}>
          {result}
          {/* <hr /> */}
          <Prompt />
        </code>
      </div>
    );
  }

  return (
    <Window customStyle={{ borderRadius: "0px 0px 10px 10px" }}>
      <div className={style.topBar}>
        <button className={style.topBar_addObject}></button>
        <i>Console</i>
        <button className={style.topBar_search}></button>
      </div>
      <Console />
    </Window>
  );
}