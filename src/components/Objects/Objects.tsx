import { useState } from 'react';
import style from './Objects.module.scss';
import Window from '../Window/Window.tsx';
import folderIcon from './folder.svg';
import arrowDownIcon from './arrow_down.svg';
import arrowUpIcon from './arrow_up.svg';

export default function Objects() {
  const [objectIsOpened, setobjectIsOpened] = useState({
    InGame: true,
    Chr1: false
  });

  interface ObjKind {
    [key: string]: number
  }

  const ObjKindEnum: ObjKind = {
    scene: 0,
    object: 1,
  }

  interface Object {
    name: string,
    kind: ObjKind,
    child: Object[] | null
  }

  const [objectTree, setObjectTree] = useState<Object>(
    {
      name: 'InGame', kind: ObjKindEnum.scene, child: [
        { name: 'Tlqkf', kind: ObjKindEnum.object, child: null },
        { name: 'Tlqkf2', kind: ObjKindEnum.object, child: null },
        {
          name: 'Chr1', kind: ObjKindEnum.object, child: [
            {
              name: 'Head', kind: ObjKindEnum.object, child: null
            },
            {
              name: 'arm', kind: ObjKindEnum.object, child: null
            },
            {
              name: 'body', kind: ObjKindEnum.object, child: null
            },
            {
              name: 'leg', kind: ObjKindEnum.object, child: null
            },
            { name: 'foot', kind: ObjKindEnum.object, child: null }
          ]
        }
      ]
    }
  );

  function Object({ children, name, icon, isHidden }) {

    const content = (
      <>
        <div className={style.object_icon}><img src={icon}></img></div>
        <span className={style.object_name}>{name}</span>
        <div className={style.object_see}></div>
        <div className={style.object_goto}></div>
      </>
    );

    if (children !== undefined) {
      return (
        <div className={(true) ? style.object_folder1 : style.object_folder2}>
          <div className={style.object}>
            <div className={style.object_arrow} onClick={(e) => {
              setobjectIsOpened({
                ...objectIsOpened,
                [name]: !objectIsOpened[name]
              });
            }}>
              <img src={(objectIsOpened[name]) ? arrowDownIcon : arrowUpIcon}></img>
            </div>
            {content}
          </div>
          {(objectIsOpened[name]) ? <div className={style.object_child}>{children}</div> : null}
        </div>
      );
    } else {
      return (
        <div className={style.object}>
          {content}
        </div>
      );
    }
  }

  return (
    <Window>
      <div className={style.topBar}>
        <button className={style.topBar_addObject}></button>
        <i>여기에 검색하세요</i>
        <button className={style.topBar_search}></button>
      </div>
      <div className={style.objects}>
        <Object name="InGame" icon={folderIcon} isHidden={false}>
          <Object name="Tlqkf" icon={folderIcon} isHidden={true} />
          <Object name="Tlqkf2" icon={folderIcon} isHidden={false} />
          <Object name="Chr1" icon={folderIcon} isHidden={true}>
            <Object name="Head" icon={folderIcon} isHidden={true} />
            <Object name="arm" icon={folderIcon} isHidden={true} />
            <Object name="body" icon={folderIcon} isHidden={true} />
            <Object name="leg" icon={folderIcon} isHidden={true} />
            <Object name="foot" icon={folderIcon} isHidden={true} />
          </Object>
        </Object>
      </div>
    </Window>
  );
}