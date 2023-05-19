import style from './Window.module.scss';

interface WrapperProps {
  children: React.ReactNode;
  customStyle?: object;
}

const Wrapper: React.FC<WrapperProps> = ({ children, customStyle }) => {
  return (
    <div style={customStyle} className={style.window}>
      {children}
    </div>
  )
}

export default Wrapper