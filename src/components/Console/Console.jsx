import { useEffect, useState } from 'react';
import style from './Console.module.scss';
import Window from '../Window/Window';
import { system } from '../../system';

export default function Console() {
  const [logs, setLogs] = useState([
    { kind: 'input', content: "asdgjohgasfdjkhgafjkhgsdoujasgd", time: '054301' },
    { kind: 'error', content: "알 수 없는 명령어" },
    { kind: 'input', content: "sys run" },
    { kind: 'text', content: "시스템: 살행 중" },
    { kind: 'text', content: "시스템: 살행 완료" },
    { kind: 'warning', content: "InGame 코딩이 이상해유" },
    { kind: 'warning', content: "코드를 너무 엿같이 짜놨읍니다" },
    { kind: 'warning', content: "코드를 너무 엿같이 짜놨읍니다" },
  ]);

  function Console() {
      const dgfojisdg = [];
    // useEffect(() => {
      for(let i=0; i<8; i++) {
        const item = logs[i];

        if(item.kind === 'input') {
          return (
            <div>
              <span className={style.target}>&#62;</span>
              {item.content}
            </div>
          )
        } else if(item.kind === 'error') {
          return (
            <div className={style.errer}>{item.content}</div>
          )
        } else if(item.kind === 'warning') {
          return (
            <div className={style.warning}>{item.content}</div>
          )
        } else if(item.kind === 'text') {
          return (
            <div>{item.content}</div>
          )
        }
      }



      // const content = logs.map(item => {
      //   if(item.kind === 'input') {
      //     return (
      //       <div>
      //         <span className={style.target}>&#62;</span>
      //         {item.content}
      //       </div>
      //     )
      //   } else if(item.kind === 'error') {
      //     return (
      //       <div className={style.errer}>{item.content}</div>
      //     )
      //   } else if(item.kind === 'warning') {
      //     return (
      //       <div className={style.warning}>{item.content}</div>
      //     )
      //   } else if(item.kind === 'text') {
      //     return (
      //       <div>{item.content}</div>
      //     )
      //   }
      // });

      // console.log(content[0])

      // return(content[0])
    // }, [logs, '']);

    return('')

    // return(
    //   <code className={style.console}>
    //     <div>
    //       <div>
    //         <span className={style.target}>&#62;</span>
    //         asdgjohgasfdjkhgafjkhgsdoujasgd
    //       </div>
    //       <div className={style.errer}>오류 - 알 수 없는 명령어</div>
    //       <div>
    //         <span className={style.target}>&#62;</span>
    //         sys run
    //       </div>
    //       <div>시스템: 실행 중</div>
    //       <div>시스템: 실행 완료</div>
    //       <div className={style.warning}>주의 - <span className={style.object}>InGame</span> 코딩이 이상해유</div>
    //       <div className={style.warning}>주의 - 코드를 너무 엿같이 짜놨읍니다</div>
    //       <div className={style.warning}>주의 - 코드를 너무 엿같이 짜놨읍니다</div>
    //     </div>
    //     <div className={style.consoleInput_wrap}>
    //       <span className={style.target}>&#62;</span>
    //       <input
    //         className={style.consoleInput}
    //         onKeyDown={(e)=>{
    //           if(e.key == 'Enter') {
    //             system.run(e.target.value);
    //             e.target.value = "";
    //           }
    //         }}>
    //       </input>
    //     </div>
    //   </code>
    // )
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

export const sysConsole = {
  command: function(Props) {

    console.log(Props);
    console.log("연산 시작");
  },
  text: function(Props) {
    console.log(Props)
  },
  warning: function(Props) {
    console.log(Props);
  },
  endCalculation: function() {
    console.log("연산 끝");
  }
}