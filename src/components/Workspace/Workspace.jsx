import React, { useState } from 'react';
import style from './Workspace.module.scss';
import Window from '../Window/Window';

export default function WorkSpace() {
  function WorkMenu() {
    const [workMenu, setWorkMenu] = useState([
      {
        fullName: "asd.sdcod",
        fileName: "asd",
        extension: "sdcod"
      },
      {
        fullName: "assdfggfsdraedgshsdfd.sdcod",
        fileName: "assdfggfsdraedgshsdfd",
        extension: "sdcod"
      },
    ]);
  
    const [selectedMenu, setSelectedMenu] = useState(1);

    return(
      <div className={style.workMenu}>
        {workMenu.map(({fileName, extension}, i) => 
          <div
            className={
              (selectedMenu === i) ?
                `${style.menuItemSelected} ${style.menuItem}`
              : style.menuItem
            }
            key={i}
            >
            
            <span className={style.menuItemContent}>{fileName}</span>.{extension}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={style.workSpace}>
      <WorkMenu />
      <Window customStyle={{ borderRadius: "0px 0px 15px 15px" }}>
        <div></div>
      </Window>
    </div>
  );
}