import style from './style/Console.module.scss';
import Window from './Window';

function Console() {
  return (
    <Window>
      <header className={style.header}>
        <button className={style.header_addObject}></button>
        <i>Console</i>
        <button className={style.header_search}></button>
      </header>
    </Window>
  );
}

export default Console;