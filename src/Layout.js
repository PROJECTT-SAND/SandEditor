import style from './style/layout.module.scss';
import Viewer from './viewer';
import Objects from './objects';

function Layout() {
  return (
    <>
      <Viewer />
      <Objects />
    </>
  );
}

export default Layout;