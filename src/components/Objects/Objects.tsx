import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './Objects.module.scss';
import Window from '@components/Wrapper/Window';
import { OBJECT_TYPE } from '@/constants'
import { Object } from '@/classes'
import { objectTreeNode } from '@/types'

import folderIcon from '@assets/icon/object/folder.svg';
import arrowDownIcon from '@assets/icon/object/arrow_down.svg';
import arrowUpIcon from '@assets/icon/object/arrow_up.svg';

export default function Objects() {
  const [objectDatas, setObjectDatas] = useState<{ [uuid: string]: Object }>({
    "1": { name: 'InGame', type: OBJECT_TYPE.Scene, isHidden: false, parentUUID: null, UUID: "1" },
    "2": { name: 'Tlqkf', type: OBJECT_TYPE.Object, isHidden: true, parentUUID: "1", UUID: "2" },
    "3": { name: 'Tlqkf2', type: OBJECT_TYPE.Object, isHidden: false, parentUUID: "1", UUID: "3" },
    "4": { name: 'Chr1', type: OBJECT_TYPE.Object, isHidden: false, parentUUID: "1", UUID: "4" },
    "5": { name: 'Head', type: OBJECT_TYPE.Object, isHidden: false, parentUUID: "4", UUID: "5" },
    "6": { name: 'arm', type: OBJECT_TYPE.Object, isHidden: false, parentUUID: "4", UUID: "6" },
    "7": { name: 'body', type: OBJECT_TYPE.Object, isHidden: false, parentUUID: "4", UUID: "7" },
  });

  const [objectTree, setObjectTree] = useState<objectTreeNode[]>([
    {
      uuid: "1",
      isOpened: false,
      children: [
        {
          uuid: "2",
          isOpened: true,
          children: []
        }
      ]
    }
  ]);

  const ObjectTree: React.FC<{ treeData: objectTreeNode[] }> = ({ treeData }) => {
    return (
      <>
        {
          treeData.map((node) => {
            <ObjectTreeNode uuid={node.uuid} isOpened={node.isOpened} children={node.children} />
          })
        }
      </>
    )
  }

  const ObjectTreeNode: React.FC<objectTreeNode> = ({ uuid, isOpened, children }) => {
    const objectData = objectDatas[uuid];
    const name = objectData.name;
    let icon = folderIcon;

    if (objectData.type == OBJECT_TYPE.Scene) {
      icon = folderIcon
    }

    const setFold = () => {
      isOpened = !isOpened;
    }

    return (
      <div className={(true) ? style.object_folder1 : style.object_folder2}>
        <div className={style.object}>
          <div className={style.object_arrow} onClick={setFold}>
            <img src={isOpened ? arrowDownIcon : arrowUpIcon}></img>
          </div>
          <div className={style.object_icon}><img src={icon}></img></div>
          <span className={style.object_name}>{name}</span>
          <div className={style.object_see}></div>
          <div className={style.object_goto}></div>
        </div>
        {isOpened ? <ObjectTree treeData={children} /> : null}
      </div>
    );
  }

  return (
    <Window>
      <div className={style.topBar}>
        <button className={style.topBar_addObject}></button>
        <i>검색</i>
        <button className={style.topBar_search}></button>
      </div>
      <div className={style.objects}>
        <ObjectTree treeData={objectTree} />
      </div>
    </Window>
  );
}