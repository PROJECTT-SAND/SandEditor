import style from './style/Objects.module.scss';
import Window from './Window';
<Window>
</Window>
function Objects() {
  return (
    <Window>
      <div className={style.topBar}>
        <button className={style.topBar_addObject}></button>
        <i>여기에 검색하세요</i>
        <button className={style.topBar_search}></button>
      </div>
      <img></img>
      <span></span>
    </Window>
  );
}

export default Objects;