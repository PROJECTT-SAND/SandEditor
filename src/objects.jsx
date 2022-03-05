import style from './style/Objects.module.scss';
import Window from './Window';
<Window>
</Window>
function Objects() {
  return (
    <Window>
      <header className={style.header}>
        <button className={style.header_addObject}></button>
        <i>여기에 검색하세요</i>
        <button className={style.header_search}></button>
      </header>
      <img></img>
      <span></span>
    </Window>
  );
}

export default Objects;