import style from './style/Layout.module.scss';
import React, { useState } from 'react';
import Viewer from './Viewer';
import ViewerController from './ViewerController';
import Objects from './Objects';
import Folder from './Folder';
import Workspace from './Workspace';
import Console from './Console';

function Layout() {
  const [leftBottomLayoutSize, setleftBottomLayoutSize] = useState(60);
  const [rightLayoutSize, setrightLayoutSize] = useState(60);

  return (
    <div className={style.layout}>
      <div className={style.layout_left}>
        <div className={style.viewer}>
          <div className={style.viewer_viewer}><Viewer /></div>
          <div className={style.viewer_controller}><ViewerController /></div>
        </div>
        <div className={style.layout_left_bottom}>
          <div className={style.objects} style={{ width: `${leftBottomLayoutSize}%` }}><Objects /></div>
          <span className={style.window_controller} style={{ left: `${leftBottomLayoutSize}%` }}></span>
          <div className={style.folder}><Folder /></div>
        </div>
      </div>
      <div className={style.layout_right}>
        <div className={style.workspace} style={{ height: `${rightLayoutSize}%` }}><Workspace /></div>
        <span className={style.window_controller} style={{ top: `${rightLayoutSize}%` }}></span>
        <div className={style.console}><Console /></div>
      </div>
    </div>
  );
}

export default Layout;