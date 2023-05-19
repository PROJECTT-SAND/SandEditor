import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './Objects.module.scss';
import Window from '@components/Window/Window';

import folderIcon from '@assets/icon/object/folder.svg';
import arrowDownIcon from '@assets/icon/object/arrow_down.svg';
import arrowUpIcon from '@assets/icon/object/arrow_up.svg';

import { OBJ_KIND } from '@/constants';

export default function Objects() {
  interface Object {
    name: string,
    kind: number,
    isHidden: boolean,
    parentUUID: any | null,
    UUID: any
  }

  const [objectIsOpened, setobjectIsOpened] = useState<{ [key: string]: boolean }>({
    InGame: true,
    Chr1: false
  });

  class OBJ {
    UUID: string;
    name: string;
    kind: typeof OBJ_KIND;
    isHidden: boolean;
    parentUUID: number;

    constructor(name: string, kind: typeof OBJ_KIND, isHidden: boolean, parentUUID: number) {
      this.name = name;
      this.kind = kind;
      this.isHidden = isHidden;
      this.parentUUID = parentUUID;
      this.UUID = uuidv4();
    }
  }

  const [objectTree, setObjectTree] = useState<Object[]>(
    [
      { name: 'InGame', kind: OBJ_KIND.scene, isHidden: false, parentUUID: null, UUID: 1 },
      { name: 'Tlqkf', kind: OBJ_KIND.object, isHidden: true, parentUUID: 1, UUID: 2 },
      { name: 'Tlqkf2', kind: OBJ_KIND.object, isHidden: false, parentUUID: 1, UUID: 3 },
      { name: 'Chr1', kind: OBJ_KIND.object, isHidden: false, parentUUID: 1, UUID: 4 },
      { name: 'Head', kind: OBJ_KIND.object, isHidden: false, parentUUID: 4, UUID: 5 },
      { name: 'arm', kind: OBJ_KIND.object, isHidden: false, parentUUID: 4, UUID: 6 },
      { name: 'body', kind: OBJ_KIND.object, isHidden: false, parentUUID: 4, UUID: 7 },
    ]
  );

  const testValue = [
    { key: "0", UUID: 2, children: null },
    { key: "1", UUID: 2, children: null },
    {
      key: "2", UUID: 2, children: [
        {
          key: "2-0", UUID: 2, children: null
        },
        {
          key: "2-1", UUID: 2, children: null
        },
        {
          key: "2-2", UUID: 2, children: null
        },
        {
          key: "2-3", UUID: 2, children: null
        },
        { key: "2-4", UUID: 2, children: null }
      ]
    }
  ]

  // useEffect(() => {
  //   const objectTreeSorted = objectTree.sort((a, b) => {
  //     return a.treeDepth - b.treeDepth;
  //   })

  //   objectTreeSorted.map((object) => {
  //     let icon = folderIcon;

  //     if (object.kind == OBJ_KIND.object) {
  //       icon = folderIcon;
  //     }

  //     const objectElem = (
  //       <>
  //         <Object name={object.name} icon={icon} isHidden={object.isHidden} />
  //       </>
  //     );

  //     if (object.parentUUID !== null) {
  //       objectRoot.current?.appendChild(objectElem);
  //     } else {
  //       objectRoot.current?.appendChild(objectElem);
  //     }
  //   })
  // }, [objectRoot])

  const setObjFold = (name: string) => {
    setobjectIsOpened({
      ...objectIsOpened,
      [name]: !objectIsOpened[name]
    });
  }

  const ObjectNode: React.FC<{ node: any }> = ({ node }) => {
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

  function ObjectTree() {
    return (
      <>
        {
          testValue.map((node) => {
            <ObjectNode node={node} key={node.key} />
          })
        }
      </>
    )
  }

  return (
    <Window>
      <div className={style.topBar}>
        <button className={style.topBar_addObject}></button>
        <i>여기에 검색하세요</i>
        <button className={style.topBar_search}></button>
      </div>
      <div className={style.objects}>
        <ObjectTree />
      </div>
    </Window>
  );
}