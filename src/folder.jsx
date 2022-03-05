import style from './style/Folder.module.scss';
import Window from './Window';

function Folder() {
  return (
    <Window>
      <div className={style.topBar}>
        <i>C:/users/user/desktop/game</i>
        <button className={style.topBar_back}></button>
      </div>
    </Window>
  );
}

export default Folder;