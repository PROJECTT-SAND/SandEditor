import { useEffect, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import style from './Terminal.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { system } from '@/system/system';
import { useBoundStore } from '@/store';
import { commands } from '@/system/system';
import { LOG_KIND } from '@/constants';

import { ReactComponent as ErrorSVG } from '@assets/icon/terminal/error.svg';
import { ReactComponent as TimeSVG } from '@assets/icon/terminal/time.svg';


export default function Console() {
  const logs = useBoundStore(store => Object.values(store.logs), shallow);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
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

    logs.map((item, key) => {
      switch (item.kind) {
        case LOG_KIND.Command:
          result.push(
            <div key={key} className={`${style.logLine} ${style.command}`}>
              <div className={style.contents}>
                <span className={`${style.target} ${style.target_old}`}>&#62;</span>
                {item.content}
              </div>
              <div className={style.time}>{item.time}<TimeSVG /></div>
            </div>
          );
          break;
        case LOG_KIND.Error:
          result.push(
            <div key={key} className={`${style.logLine} ${style.errer}`}>
              <div className={style.contents}>
                <div className={style.contents_icon}><ErrorSVG /></div>
                {item.content}
              </div>
              <div className={style.time}>{item.time}<TimeSVG /></div>
            </div>
          );
          break;
        case LOG_KIND.Warning:
          result.push(
            <div key={key} className={`${style.logLine} ${style.warning}`}>
              <div className={style.contents}>{item.content}</div>
              <div className={style.time}>{item.time}<TimeSVG /></div>
            </div>
          );
          break;
        case LOG_KIND.Text:
          result.push(
            <div key={key} className={`${style.logLine} ${style.text}`}>
              <div className={style.contents}>{item.content}</div>
              <div className={style.time}>{item.time}<TimeSVG /></div>
            </div>
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