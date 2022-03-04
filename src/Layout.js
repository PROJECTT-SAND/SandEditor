import style from './style/layout.module.scss';
import React, { useState } from 'react';
import Viewer from './viewer';
import Objects from './objects';
import Workspace from './workspace';

function Layout() {
  const [leftBottomLayoutSize, setleftBottomLayoutSize] = useState(60);
  const [rightLayoutSize, setrightLayoutSize] = useState(60);

  return (
    <div className={style.layout}>
      <div className={style.layout_left}>
        <div className={style.viewer}>
          <div className={style.viewer_viewer}><Viewer /></div>
          <div className={style.viewer_controller}></div>
        </div>
        <div className={style.layout_left_bottom}>
          <div className={style.objects} style={{ width: `${leftBottomLayoutSize}%` }}><Objects /></div>
          <div className={style.folder}></div>
        </div>
      </div>
      <div className={style.layout_right}>
        <div className={style.workspace} style={{ height: `${rightLayoutSize}%` }}><Workspace /></div>
        <div className={style.console}></div>
      </div>
    </div>
  );
}

export default Layout;