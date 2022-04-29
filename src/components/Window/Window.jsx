import style from './Window.module.scss';

export default function Wrapper({children, customStyle}) {
  return(<div style={customStyle} className={style.window}>{children}</div>)
}