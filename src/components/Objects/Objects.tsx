import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './Objects.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { OBJECT_TYPE } from '@/constants'
import { Object } from '@/classes'
import { objectTreeNode, TreePos } from '@/types'

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
      children: [
        {
          uuid: "2",
          children: []
        },
        {
          uuid: "3",
          children: []
        },
        {
          uuid: "4",
          children: [
            {
              uuid: "5",
              children: []
            },
            {
              uuid: "6",
              children: []
            },
            {
              uuid: "7",
              children: []
            }
          ]
        }
      ]
    }
  ]);

  const [selectedObject, setSelectedObject] = useState<Object | null>(null);
  const [selectedTree, setSelectedTree] = useState<TreePos>([]);

  const searchNode = (value: TreePos) => {
    let searchTree = objectTree[0];

    for (let i = 1; i < value.length; i++) {
      searchTree = searchTree.children[value[i]];
    }

    return searchTree;
  }

  const addObject = (name: string, type: OBJECT_TYPE, parentUUID: string, treePos: TreePos) => {
    let newObject = new Object(name, type, false, parentUUID);
    let selectedTreeNode = searchNode(treePos);

    setObjectDatas({ ...objectDatas, [newObject.UUID]: newObject });
    selectedTreeNode.children.push({ uuid: newObject.UUID, children: [] });
  }

  const ObjectTree: React.FC<{ treeData: objectTreeNode[], currentTree: TreePos }> = ({ treeData, currentTree }) => {
    return (
      <div className={style.object_child}>
        {
          treeData.map((node, index) => {
            let currentTreeNode = [...currentTree]
            currentTreeNode.push(index);
            return <ObjectTreeNode uuid={node.uuid} currentTree={currentTreeNode} children={node.children} key={index} />
          })
        }
      </div>
    )
  }

  const ObjectTreeNode: React.FC<objectTreeNode & { currentTree: TreePos }> = ({ uuid, currentTree, children }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const isLeafNode = children.length == 0;
    const isRoot = currentTree.length == 1;
    const objectData = objectDatas[uuid];
    const name = objectData.name;
    let icon = folderIcon;

    if (objectData.type == OBJECT_TYPE.Scene) {
      icon = folderIcon
    }

    const setFold = () => {
      setIsOpened(!isOpened);
    }

    const treeSelect = () => {
      setSelectedTree(currentTree);
      setSelectedObject(objectData);
    }

    return (
      <div className={style.object_folder1}>
        <div className={style.object_gfdfgs} >
          <div className={style.object}>
            {!isRoot ?
              <div className={style.treeline} />
              : null
            }
            {!isLeafNode ?
              <div className={style.object_arrow} onClick={setFold}>
                <img src={isOpened ? arrowDownIcon : arrowUpIcon}></img>
              </div>
              : null
            }
            <div className={style.object_aaaaa} onClick={treeSelect}>
              <div className={style.object_icon}><img src={icon}></img></div>
              <span className={style.object_name}>{name}</span>
              <div className={style.object_see}></div>
              <div className={style.object_goto}></div>
            </div>
          </div>
          {isOpened ? <ObjectTree treeData={children} currentTree={currentTree} /> : null}
        </div>
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
        <ObjectTree treeData={objectTree} currentTree={[]} />
      </div>
    </Window>
  );
}