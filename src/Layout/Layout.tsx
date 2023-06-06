import style from "./Layout.module.scss";
import { useState } from "react";
import { Viewport, Toolbar, Objects, Browser, Workspace, Terminal, Inspecter } from '@components/index';

import { ReactComponent as IconSVG } from '@assets/icon.svg';

export default function Layout() {
  const [leftBottomLayoutSize, setleftBottomLayoutSize] = useState(60);
  const [rightLayoutSize, setrightLayoutSize] = useState(60);

  const [projectName, setProjectName] = useState('project-1');

  const setProjectNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.menu}>
        <div className={style.menu_container_left}>
          <IconSVG />
          <div className={style.manu_item}>menu</div>
          <div className={style.manu_item}>setting</div>
        </div>
        <div className={style.menu_container_middle}>
          {/* <div className={style.manu_item}>project-1</div> */}
          <input type='text' value={projectName} onChange={setProjectNameValue} className={style.manu_projectName}></input>
          <div className={style.manu_button}>share</div>
        </div>
        <div className={style.menu_container_right}>
          <div className={style.manu_item}>account</div>
        </div>
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
