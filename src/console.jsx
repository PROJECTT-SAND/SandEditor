import style from './style/Console.module.scss';
import Window from './Window';

function Console() {
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

export default Console;