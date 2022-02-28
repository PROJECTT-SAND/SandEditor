import style from './style/layout.module.scss';
import Viewer from './viewer';
import Objects from './objects';
import Blocks from './blocks';
import Workspace from './workspace';

function Layout() {
  return (
    <>
      <div>
        <Viewer />
        <Objects />
      </div>
      <Blocks />
      <Workspace />
    </>
  );
}

export default Layout;