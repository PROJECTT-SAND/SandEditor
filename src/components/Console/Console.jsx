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
    </Window>
  );
}