import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './Objects.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { OBJECT_TYPE } from '@/constants'
import { Object } from '@/classes'
import { objectTreeNode, TreePos } from '@/types'
import { useBoundStore } from "@/store";
import { addSceneObject } from '@components/Viewport/threejs';

import folderIcon from '@assets/icon/object/folder.svg';
import arrowDownIcon from '@assets/icon/object/arrow_down.svg';
import arrowUpIcon from '@assets/icon/object/arrow_up.svg';

import { ReactComponent as AddSVG } from '@assets/icon/add.svg';
import { ReactComponent as SearchSVG } from '@assets/icon/search.svg';

export default function Objects() {
  const { objectDatas, setObjectDatas, objectTree, setObjectTree, selectedObjectUUID, setSelectedObjectUUID } = useBoundStore();
  const [isOpened, setIsOpened] = useState<{ [key: string]: boolean }>({});
  // const [selectedObject, setSelectedObject] = useState<Object | null>(null);
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

    selectedTreeNode.children.push({ uuid: newObject.UUID, children: [] });
    setObjectDatas({ ...objectDatas, [newObject.UUID]: newObject });
    addSceneObject(newObject);
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
    const isLeafNode = children.length == 0;
    const isRoot = currentTree.length == 1;
    const isSelected = selectedObjectUUID == uuid;
    const objectData = objectDatas[uuid];
    const name = objectData.name;
    let icon = folderIcon;

    const setFold = () => {
      setIsOpened({ ...isOpened, [uuid]: !isOpened![uuid] });
    }

    const setSee = () => {
    }

    const treeSelect = () => {
      setSelectedTree(currentTree);
      setSelectedObjectUUID(uuid);
    }

    if (objectData.type == OBJECT_TYPE.Scene) {
      icon = folderIcon
    }

    return (
      <div className={style.object_folder1}>
        <div className={style.object_gfdfgs} >
          <div className={`${style.object} ${isSelected ? style.object_selected : ''}`}>
            {!isRoot ?
              <div className={style.treeline} />
              : null
            }
            {!isLeafNode ?
              <div className={style.object_arrow} onClick={setFold}>
                <img src={(isOpened![uuid]) ? arrowDownIcon : arrowUpIcon}></img>
              </div>
              : null
            }
            <div className={style.object_aaaaa} onClick={treeSelect}>
              <div className={style.object_icon}><img src={icon}></img></div>
              <span className={style.object_name}>{name}</span>
              <div className={style.object_see} onClick={setSee}></div>
              <div className={style.object_goto}></div>
            </div>
          </div>
          {(isOpened![uuid]) ? <ObjectTree treeData={children} currentTree={currentTree} /> : null}
        </div>
      </div>
    );
  }

  return (
    <Window>
      <div className={style.topBar}>
        <div className={style.searchBar}>
          <SearchSVG />
          <i>검색</i>
        </div>
        <button className={style.addObject} onClick={() => { if (selectedObjectUUID) addObject('aaa', OBJECT_TYPE.Object, selectedObjectUUID, selectedTree) }}><AddSVG /></button>
      </div>
      <div className={style.objects}>
        <ObjectTree treeData={objectTree} currentTree={[]} />
      </div>
    </Window>
  );
}