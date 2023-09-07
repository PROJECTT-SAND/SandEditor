import { useEffect, useRef, useState } from 'react';
import style from './Objects.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { SandObject, SandScene, SandCamera } from '@/classes'
import { objectTreeNode, TreePos } from '@/types'
import { useBoundStore } from "@/store";
import { objectDataManager } from '@/system/objectDataManager';

import { ReactComponent as FolderIconSVG } from '@assets/image/icon/object/folder.svg';
import { ReactComponent as SceneIconSVG } from '@assets/image/icon/object/scene.svg';
import { ReactComponent as CameraIconSVG } from '@assets/image/icon/object/camera.svg';
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
    const Scene = new SandScene('Scene');
    const Camera = new SandCamera('Camera', Scene.UUID, 1, 50, 0.1, 2000);

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
    let newObject = new SandObject(name, selectedObjectUUID);
    let selectedTreeNode = searchNode(selectedTree);

    selectedTreeNode.children.push({ uuid: newObject.UUID, children: [] });
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
    let IconSVG;

    const setFold = () => {
      setIsOpened({ ...isOpened, [uuid]: !isOpened![uuid] });
    }

    const treeSelect = () => {
      // setIsCanAdd(objectData.type != OBJECT_TYPE.Camera);
      setIsCanAdd(!(objectData instanceof SandCamera));
      setSelectedTree(currentTree);
      setSelectedObjectUUID(uuid);
    }

    if (objectData instanceof SandScene) {
      IconSVG = SceneIconSVG;
    } else if (objectData instanceof SandCamera) {
      IconSVG = CameraIconSVG;
    } else if (objectData instanceof SandObject) {
      IconSVG = FolderIconSVG;
    } else {
      IconSVG = FolderIconSVG;
    }

    // switch (objectData.type) {
    //   case OBJECT_TYPE.Camera:
    //     IconSVG = CameraIconSVG;
    //     break;
    //   case OBJECT_TYPE.Scene:
    //     IconSVG = SceneIconSVG;
    //     break;
    //   case OBJECT_TYPE.Object:
    //     IconSVG = FolderIconSVG;
    //     break;
    //   default:
    //     IconSVG = FolderIconSVG;
    //     break;
    // }

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
          <div className={style.object_icon}><IconSVG /></div>
          <span className={style.object_name}>{objectData.name}</span>
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