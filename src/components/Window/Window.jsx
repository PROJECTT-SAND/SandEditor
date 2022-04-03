import style from './Window.module.scss';

export default function Wrapper({children}) {
  return(<div className={style.window}>{children}</div>)
}