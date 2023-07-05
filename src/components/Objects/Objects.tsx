import { useEffect, useRef, useState } from 'react';
import style from './Objects.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { OBJECT_TYPE } from '@/constants'
import { SandObjectBase, SandObject } from '@/classes'
import { objectTreeNode, TreePos } from '@/types'
import { useBoundStore } from "@/store";
import { addSceneObject } from '@/system/threejs';

import folderIcon from '@assets/image/icon/object/folder.svg';
import { ReactComponent as ArrowDownSVG } from '@assets/image/icon/object/arrow_down.svg';
import { ReactComponent as ArrowUpSVG } from '@assets/image/icon/object/arrow_up.svg';
import { ReactComponent as AddSVG } from '@assets/image/icon/add.svg';
import { ReactComponent as DropdownSVG } from '@assets/image/icon/object/dropdown.svg';
import { ReactComponent as SearchSVG } from '@assets/image/icon/search.svg';

export default function Objects() {
  const { objectDatas, setObjectDatas, objectTree, setObjectTree, selectedObjectUUID, setSelectedObjectUUID } = useBoundStore();
  const [isOpened, setIsOpened] = useState<{ [key: string]: boolean }>({});
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [selectedTree, setSelectedTree] = useState<TreePos>([]);
  const [isCanAdd, setIsCanAdd] = useState(false);
  const wrapperElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Scene = new SandObjectBase('Scene', OBJECT_TYPE.Scene, null);
    const Camera = new SandObjectBase('Camera', OBJECT_TYPE.Camera, Scene.UUID);

    setObjectDatas({ [Scene.UUID]: Scene, [Camera.UUID]: Camera })
    setObjectTree(
      [{
        uuid: Scene.UUID,
        children: [
          {
            uuid: Camera.UUID,
            children: [],
          },
        ],
      }],
    )
  }, []);

  useEffect(() => {
    if (!wrapperElem.current) return
    if (isScrollBottom) {
      wrapperElem.current.scrollTop = wrapperElem.current.scrollHeight - wrapperElem.current.clientHeight;
    }
  }, [objectDatas]);

  const searchNode = (value: TreePos) => {
    let searchTree = objectTree[0];

    for (let i = 1; i < value.length; i++) {
      searchTree = searchTree.children[value[i]];
    }

    return searchTree;
  }

  const addObject = () => {
    if (!selectedObjectUUID || !wrapperElem.current || !isCanAdd) return;

    setIsScrollBottom(wrapperElem.current.scrollTop >= wrapperElem.current.scrollHeight - wrapperElem.current.clientHeight);

    let name = 'object' + (Object.keys(objectDatas).length - 1)
    let newObject = new SandObject(name, OBJECT_TYPE.Object, false, selectedObjectUUID);
    let selectedTreeNode = searchNode(selectedTree);

    selectedTreeNode.children.push({ uuid: newObject.UUID, children: [] });
    setObjectDatas({ ...objectDatas, [newObject.UUID]: newObject });
    addSceneObject(newObject);
    setIsOpened({ ...isOpened, [selectedObjectUUID]: true });
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
      setIsCanAdd(objectData.type != OBJECT_TYPE.Camera);
      setSelectedTree(currentTree);
      setSelectedObjectUUID(uuid);
    }

    if (objectData.type == OBJECT_TYPE.Scene) {
      icon = folderIcon
    }

    return (
      <div className={style.object_folder}>
        <div className={`${style.object} ${isSelected ? style.object_selected : ''}`} onClick={treeSelect}>
          <div className={style.object_arrow} onClick={!isLeafNode ? setFold : () => { }}>
            {!isLeafNode ?
              (isOpened![uuid]) ?
                <ArrowDownSVG />
                : <ArrowUpSVG />
              : ''}
          </div>
          <div className={style.object_icon}><img src={icon}></img></div>
          <span className={style.object_name}>{name}</span>
          <div className={style.object_see} onClick={setSee}></div>
          <div className={style.object_goto}></div>
        </div>
        {(isOpened![uuid]) ? <ObjectTree treeData={children} currentTree={currentTree} /> : null}
      </div >
    );
  }

  return (
    <Window>
      <div className={style.topBar}>
        <div className={style.searchBar}>
          <SearchSVG />
          <i>검색</i>
        </div>
        <button
          className={`${style.addObject} ${!isCanAdd ? style.addObject_disabled : ''}`}
          onClick={addObject}
          title='오브젝트 추가'
        >
          <div className={style.addObject_add}><AddSVG /></div>
          <div className={style.addObject_dropdown}><DropdownSVG /></div>
        </button>
      </div>
      <div className={style.objects} ref={wrapperElem}>
        <ObjectTree treeData={objectTree} currentTree={[]} />
      </div>
    </Window>
  );
}