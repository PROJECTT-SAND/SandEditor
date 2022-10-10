import style from './Folder.module.scss';
import Window from '../Window/Window';
import example from './example1.png';

export default function Folder() {
  return (
    <Window>
      <div className={style.topBar}>
        <i>C:/users/user/desktop/game</i>
        <button className={style.topBar_back}></button>
      </div>
      <div className={style.folder}>
        <div className={style.file}><img src={example} alt='야쓰'></img><span>1111</span></div>
        <div className={style.file}><img src={example} alt='야쓰'></img><span>222222</span></div>
      </div>
    </Window>
  );
}