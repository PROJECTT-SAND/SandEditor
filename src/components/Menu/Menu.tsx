import style from "./Menu.module.scss";
import { ReactComponent as IconSVG } from '@assets/image/icon.svg';
import { useEffect, useRef, useState } from "react";
import { useBoundStore } from "@/store";

export default function Menu() {
  const { isSettingsOpen, setIsSettingsOpen, optionState } = useBoundStore();
  const [projectName, setProjectName] = useState('project-1');
  const [hideMenu, setHideMenu] = useState(false);
  const wrapperElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (optionState.fullScreen) {
      setHideMenu(false);

      setTimeout(() => {
        setHideMenu(true);
      }, 100);
    } else {
      setHideMenu(false);
    }
  }, [optionState.fullScreen])


  useEffect(() => {
    if (!wrapperElem.current) return;
    wrapperElem.current.addEventListener('mouseenter', () => {
      setHideMenu(false);
    })
    wrapperElem.current.addEventListener('mouseleave', () => {
      setHideMenu(true);
    })
  }, [])

  const setProjectNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  }

  const clickIsSettingsOpen = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  return (
    <div className={`${style.menu_wrap} ${optionState.fullScreen ? style.menu_fullscreen : ''}`} ref={wrapperElem}>
      <div className={`${style.menu} ${hideMenu ? style.menu_hide : ''}`}>
        <div className={style.menu_container_left}>
          <IconSVG />
          <div className={style.manu_item}>Menu</div>
          <div className={style.manu_item} onClick={clickIsSettingsOpen}>Settings</div>
        </div>
        <div className={style.menu_container_middle}>
          {/* <div className={style.manu_item}>project-1</div> */}
          <input type='text' value={projectName} onChange={setProjectNameValue} className={style.manu_projectName}></input>
          <div className={style.manu_button}>share</div>
        </div>
        <div className={style.menu_container_right}>
          <div className={style.manu_item}>Home</div>
          <div className={style.manu_item}>Sign in</div>
        </div>
      </div>
    </div>
  )
}