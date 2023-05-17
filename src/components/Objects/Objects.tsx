import { useEffect, useState } from 'react';
import style from './Objects.module.scss';
import Window from '@components/Window/Window';

import folderIcon from '@assets/icon/object/folder.svg';
import arrowDownIcon from '@assets/icon/object/arrow_down.svg';
import arrowUpIcon from '@assets/icon/object/arrow_up.svg';

export default function Objects() {

  interface asdfasdf {
    [key: string]: boolean;
  }


  interface ObjKind {
    [key: string]: number
  }

  const ObjKind: ObjKind = {
    scene: 0,
    object: 1,
  }

  interface Object {
    name: string,
    kind: number,
    isHidden: boolean,
    parentUUID: any | null,// uuidv4
    UUID: any// uuidv4
  }

  interface WrapperProps {
    children?: React.ReactNode;
    name: any;
    icon: any;
    isHidden: boolean;
  }

  const [objectIsOpened, setobjectIsOpened] = useState<asdfasdf>({
    InGame: true,
    Chr1: false
  });

  // npm i uuid
  // npm i @types/uuid
  // import { v4 as uuidv4 } from 'uuid';
  // uuidv4();

  class object {
    constructor(name, kind, isHidden, parentUUID) {
      this.UUID = uuidv4();
      this.treeDepth = 123123;
    }
  }

  const [objectTree, setObjectTree] = useState<Object[]>(
    [
      { name: 'InGame', kind: ObjKind.scene, isHidden: false, treeDepth: 0, parentUUID: null, UUID: 1 },
      { name: 'Tlqkf', kind: ObjKind.object, isHidden: true, treeDepth: 1, parentUUID: 1, UUID: 2 },
      { name: 'Tlqkf2', kind: ObjKind.object, isHidden: false, treeDepth: 1, parentUUID: 1, UUID: 3 },
      { name: 'Chr1', kind: ObjKind.object, isHidden: false, treeDepth: 1, parentUUID: 1, UUID: 4 },
      { name: 'Head', kind: ObjKind.object, isHidden: false, treeDepth: 2, parentUUID: 4, UUID: 5 },
      { name: 'arm', kind: ObjKind.object, isHidden: false, treeDepth: 2, parentUUID: 4, UUID: 6 },
      { name: 'body', kind: ObjKind.object, isHidden: false, treeDepth: 2, parentUUID: 4, UUID: 7 },
    ]
    // {
    //   name: 'InGame', kind: ObjKindEnum.scene, child: [
    //     { name: 'Tlqkf', kind: ObjKindEnum.object, child: null },
    //     { name: 'Tlqkf2', kind: ObjKindEnum.object, child: null },
    //     {
    //       name: 'Chr1', kind: ObjKindEnum.object, child: [
    //         {
    //           name: 'Head', kind: ObjKindEnum.object, child: null
    //         },
    //         {
    //           name: 'arm', kind: ObjKindEnum.object, child: null
    //         },
    //         {
    //           name: 'body', kind: ObjKindEnum.object, child: null
    //         },
    //         {
    //           name: 'leg', kind: ObjKindEnum.object, child: null
    //         },
    //         { name: 'foot', kind: ObjKindEnum.object, child: null }
    //       ]
    //     }
    //   ]
    // }
  );

  let objectRoot;

  useEffect(() => {
    const objectTreeSorted = objectTree.sort((a, b) => {
      return a.treeDepth - b.treeDepth;
    })

    objectTreeSorted.map((object) => {
      let icon = folderIcon;

      if(object.kind == ObjKind.object) {
        icon = folderIcon;
      }

      const objectElem = (
        <Object name={object.name} icon={icon} isHidden={object.isHidden} />
      );

      if(object.parentUUID !== null) {
        objectRoot.appendChild(objectElem);
      } else {
        objectRoot.appendChild(objectElem);
      }
    })
  }, [objectRoot])

  const setObjFold = (name: string) => {
    setobjectIsOpened({
      ...objectIsOpened,
      [name]: !objectIsOpened[name]
    });
  }

  const Object: React.FC<WrapperProps> = ({ children, name, icon, isHidden }) => {
    const content = (
      <>
        <div className={style.object_icon}><img src={icon}></img></div>
        <span className={style.object_name}>{name}</span>
        <div className={style.object_see}></div>
        <div className={style.object_goto}></div>
      </>
    );

    if (children !== undefined) {
      const isOpened = objectIsOpened[name];

      // 코드 단축 필요
      return (
        <div className={(true) ? style.object_folder1 : style.object_folder2}>
          <div className={style.object}>
            <div className={style.object_arrow} onClick={() => { setObjFold(name) }}>
              <img src={isOpened ? arrowDownIcon : arrowUpIcon}></img>
            </div>
            {content}
          </div>
          {isOpened ? <div className={style.object_child}>{children}</div> : null}
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
      <div className={style.objects} bind={objectRoot}>
      </div>
    </Window>
  );
}