import style from './Window.module.scss';

function Wrapper({children}) {
  return(<div className={style.window}>{children}</div>)
}

export default Wrapper;