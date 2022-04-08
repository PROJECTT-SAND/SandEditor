import style from './Console.module.scss';
import Window from '../Window/Window';

export default function Console() {
  return (
    <Window>
      <div className={style.topBar}>
        <button className={style.topBar_addObject}></button>
        <i>Console</i>
        <button className={style.topBar_search}></button>
      </div>
      <code className={style.console}>
        <span className={style.target}>&#62; </span>asdgjohgasfdjkhgafjkhgsdoujasgd<br />
        <span className={style.errer}>오류 - 알 수 없는 명령어</span><br />
        <span className={style.target}>&#62; </span>sys run<br />
        시스템: 실행 중<br />
        시스템: 실행 완료<br />
        <span className={style.warning}>주의 - <span className={style.object}>InGame</span> 코딩이 이상해유</span><br />
        <span className={style.warning}>주의 - 코드를 너무 엿같이 짜놨읍니다</span><br />
        <span className={style.warning}>주의 - 코드를 너무 엿같이 짜놨읍니다</span><br />
        <span className={style.target}>&#62; </span><span className='cursor'>_</span>
      </code>
    </Window>
  );
}