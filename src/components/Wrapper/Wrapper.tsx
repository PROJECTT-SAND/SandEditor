import style from './Wrapper.module.scss';

interface WrapperProps {
  children: React.ReactNode;
  customStyle?: React.CSSProperties;
}

const Wrapper: React.FC<WrapperProps> = ({ children, customStyle }) => {
  return (
    <div style={customStyle} className={style.window}>
      {children}
    </div>
  )
}

export default Wrapper