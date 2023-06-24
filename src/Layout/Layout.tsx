import style from "./Layout.module.scss";
import { useState } from "react";
import { Viewport, Toolbar, Objects, Browser, Workspace, Terminal, Inspecter, Menu, Settings } from '@components/index';

export default function Layout() {
  const [leftBottomLayoutSize, setLeftBottomLayoutSize] = useState(60);
  const [rightLayoutSize, setRightLayoutSize] = useState(60);

  return (
    <div className={style.wrapper}>
      <Settings />
      <div className={style.menu}>
        <Menu />
      </div>
      <div className={style.layout}>
        <div className={style.layout_left}>
          <div className={style.viewer}>
            <div className={style.viewer_viewer}><Viewport /></div>
            <div className={style.viewer_controller}><Toolbar /></div>
          </div>
          <div className={style.layout_left_bottom}>
            <div className={style.objects} style={{ width: `${leftBottomLayoutSize}%` }}><Objects /></div>
            {/* <span className={style.window_controller} style={{ left: `${leftBottomLayoutSize}%` }}></span> */}
            <div className={style.folder}><Browser /></div>
          </div>
        </div>
        <div className={style.layout_right}>
          <div className={style.layout_right_top}>
            <div className={style.workspace} style={{ height: `${99}%` }}><Workspace /></div>
            <div className={style.inspecter}><Inspecter /></div>
          </div>
          {/* <span className={style.window_controller} style={{ top: `${rightLayoutSize}%` }}></span> */}
          <div className={style.console}><Terminal /></div>
        </div>
      </div>
    </div>
  );
}
