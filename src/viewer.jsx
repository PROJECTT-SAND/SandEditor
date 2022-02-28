import style from './style/viewer.module.scss';

function viewer() {
  return (
    <>
        <canvas className={style.viewer}></canvas>
    </>
  );
}

export default viewer;