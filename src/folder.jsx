import style from './style/Folder.module.scss';
import Window from './Window';

function Folder() {
  return (
    <Window>
      <header className={style.header}>
        <i>C:/users/user/desktop/game</i>
        <button className={style.header_back}></button>
      </header>
    </Window>
  );
}

export default Folder;