import style from './Inspecter.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { useBoundStore } from "@/store";
import { useEffect, useState } from 'react';
import { SandCamera, SandObject, SandScene } from '@/classes';
import { setCameraPos } from '@/system/renderer';
import { SandObjectTypes } from '@/types'

import { ReactComponent as FolderIconSVG } from '@assets/image/icon/object/folder.svg';
import { ReactComponent as SceneIconSVG } from '@assets/image/icon/object/scene.svg';
import { ReactComponent as CameraIconSVG } from '@assets/image/icon/object/camera.svg';
import { ReactComponent as DeleteSVG } from '@assets/image/icon/inspecter/delete.svg';
import { ReactComponent as TargetSVG } from '@assets/image/icon/inspecter/target.svg';
import { ReactComponent as VisibleOnSVG } from '@assets/image/icon/inspecter/visible_on.svg';
import { ReactComponent as VisibleOffSVG } from '@assets/image/icon/inspecter/visible_off.svg';
import { ReactComponent as LockOnSVG } from '@assets/image/icon/inspecter/lock_on.svg';
import { ReactComponent as LockOffSVG } from '@assets/image/icon/inspecter/lock_off.svg';
import { ReactComponent as ArrowDownSVG } from '@assets/image/icon/object/arrow_down.svg';
import { ReactComponent as ControllerSVG } from '@assets/image/icon/inspecter/controller.svg';
import { ARG } from '@/constants';


export default function Folder() {
  const { objectDatas, setObjectDatas, selectedObjectUUID, codeFiles } = useBoundStore();
  const [currentOBJ, setCurrentOBJ] = useState<SandObjectTypes>();
  const [addDropdownVisible, setAddDropdownVisible] = useState(false);
  const [controllerList, setControllerList] = useState<string[]>([]);
  const ignorePropsName = ['type', 'parentUUID', 'UUID', 'name', 'controller', 'visible'];

  useEffect(() => {
    if (!selectedObjectUUID) return;

    setCurrentOBJ(objectDatas[selectedObjectUUID]);
  }, [selectedObjectUUID, objectDatas]);

  /* ------------------------------------------------------------------------- */
  // ANCHOR functions
  /* ------------------------------------------------------------------------- */

  const onAddControllerClick = () => {
    setAddDropdownVisible(!addDropdownVisible);

    if (addDropdownVisible === true) return;
    if (currentOBJ == null) return;
    if (!(currentOBJ instanceof SandObject)) return;

    const result = Object.keys(codeFiles).filter(x => { return !(currentOBJ.controller.includes(x)) })
    setControllerList(result);
  }

  const setObjectParam = (key: string, value: any) => {
    if (selectedObjectUUID == null || currentOBJ == null) return;

    const tmp = currentOBJ;
    tmp[key as keyof Object] = value;

    setObjectDatas({ ...objectDatas, [selectedObjectUUID]: tmp });
  }

  const setVisible = () => {
    if (selectedObjectUUID == null || currentOBJ == null) return;
    if (!(currentOBJ instanceof SandObject)) return;

    const tmp = currentOBJ;
    tmp.visible = !tmp.visible;
    setObjectDatas({ ...objectDatas, [selectedObjectUUID]: tmp });
  }

  const gotoObject = () => {
    if (currentOBJ == null) return;
    if (!(currentOBJ instanceof SandObject)) return;

    setCameraPos(currentOBJ.X, currentOBJ.Y);
  }

  const lockObject = () => {

  }

  const enterProperty = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value !== '') {
    }
  }

  const deleteObject = () => {
    if (selectedObjectUUID == null || currentOBJ == null) return;
    alert("오브젝트를 삭제하시겠습니까?")

    // let tmp = { ...objectDatas };
    // delete tmp.selectedObjectUUID;
    // setObjectDatas(tmp);
  }

  const addController = (name: string) => {
    if (!selectedObjectUUID) return;
    if (!(currentOBJ instanceof SandObject)) return;

    const tmp = currentOBJ;
    tmp.controller.push(name);
    setObjectDatas({ ...objectDatas, [selectedObjectUUID]: tmp });
    setAddDropdownVisible(false);
  }

  /* ------------------------------------------------------------------------- */
  // ANCHOR components
  /* ------------------------------------------------------------------------- */

  const ObjectIcon = () => {
    if (!currentOBJ) return (<></>);

    let IconSVG;

    if (currentOBJ instanceof SandScene) {
      IconSVG = SceneIconSVG;
    } else if (currentOBJ instanceof SandCamera) {
      IconSVG = CameraIconSVG;
    } else if (currentOBJ instanceof SandObject) {
      IconSVG = FolderIconSVG;
    } else {
      IconSVG = FolderIconSVG;
    }

    return (
      <IconSVG />
    )
  }

  return (
    <Window>
      <div className={style.topBar}>
        <i>Inspecter</i>
      </div>
      <div className={style.Inspecter}>
        {(selectedObjectUUID != null && currentOBJ != null) ?
          <div className={style.inspecter_wrap}>
            {/* NOTE Object Info */}
            <div className={style.objectInfo}>
              <div className={style.objectInfo_line}>
                <div className={style.objectInfo_icon}><ObjectIcon /></div>
                <input
                  type="text"
                  value={currentOBJ.name ?? ''}
                  className={style.objectInfo_name}
                  readOnly={!(currentOBJ instanceof SandObject)}
                  onInput={(e) => { setObjectParam("name", e.currentTarget.value) }}
                ></input>
              </div>
              {currentOBJ instanceof SandObject ?
                <div className={style.objectInfo_line}>
                  <button className={style.btn_goto} title='해당 위치로 이동하기' onClick={gotoObject}><TargetSVG /></button>
                  <button className={style.btn_see} title={currentOBJ.visible ? '숨기기' : '보이기'} onClick={setVisible}>
                    {currentOBJ.visible ?
                      <VisibleOnSVG />
                      :
                      <VisibleOffSVG />
                    }
                  </button>
                  <button className={style.btn_lock} title='잠그기' onClick={lockObject}><LockOffSVG /></button>
                  <button className={style.btn_delete} title=' 오브젝트 삭제하기' onClick={deleteObject}><DeleteSVG /></button>
                </div>
                : ''}
            </div>

            <hr />

            <div className={style.property_container}>
              <div className={style.property_wrap}>
                {// NOTE Object Property
                  Object.entries(currentOBJ).map(([key, value], index) => {
                    if (ignorePropsName.includes(key)) return;
                    return (
                      <div className={style.property} key={index}>
                        <div className={style.property_label}>{key}</div>
                        <div className={style.property_input_wrap}>
                          {typeof value == "number" ?
                            <input type="number" value={value} onKeyDown={enterProperty} onInput={(e) => { setObjectParam(key, Number(e.currentTarget.value)) }}></input>
                            : typeof value == "boolean" ?
                              <input type="checkbox" checked={value} className={style.property_input_checkbox} onChange={(e) => { setObjectParam(key, e.currentTarget.checked) }}></input>
                              : typeof value == "string" ?
                                <input type="text" value={value} onKeyDown={enterProperty} onInput={(e) => { setObjectParam(key, e.currentTarget.value) }}></input>
                                : ''}
                        </div>
                      </div>
                    )
                  })
                }

                {// NOTE Controller
                  currentOBJ instanceof SandObject ?
                    currentOBJ.controller.map((controllerName, index1) => {
                      let params = codeFiles[controllerName].args;

                      return (
                        <>
                          <div className={style.controller} key={index1}>
                            <span className={style.button_arrow}><ArrowDownSVG /></span>
                            <input className={style.controller_check} type="checkbox"></input>
                            <span className={style.controller_icon}><ControllerSVG /></span>
                            <div className={style.controller_label}>{controllerName}</div>
                          </div>

                          {
                            Object.entries(params).map(([key, param], index2) => {
                              return (
                                <div className={style.property} key={index1 + '-' + index2}>
                                  <div className={style.property_label}>{param.label}</div>
                                  <div className={style.property_input_wrap}>
                                    {param.type == ARG.Number ?
                                      <input type="number" value={param.value} onKeyDown={enterProperty} onInput={(e) => { setObjectParam(param.label, Number(e.currentTarget.value)) }}></input>
                                      : param.type == ARG.Boolean ?
                                        <input type="checkbox" checked={param.value} className={style.property_input_checkbox} onChange={(e) => { setObjectParam(param.label, e.currentTarget.checked) }}></input>
                                        : param.type == ARG.String ?
                                          <input type="text" value={param.value} onKeyDown={enterProperty} onInput={(e) => { setObjectParam(param.label, e.currentTarget.value) }}></input>
                                          : ''}
                                  </div>
                                </div>
                              )
                            })
                          }
                        </>
                      )
                    })
                    : ''
                }

                {// NOTE Add Controller 
                  currentOBJ instanceof SandObject ?
                    <div className={style.addController_wrap}>
                      <button className={style.btnAdd} onClick={onAddControllerClick}>Add Controller</button>
                      {
                        addDropdownVisible ?
                          <div className={style.addController_dropdown}>
                            {
                              controllerList.map((controller, index) => {
                                return (
                                  <div className={style.addController_dropdown_item} key={index} onClick={() => { addController(controller); }}>{controller}</div>
                                )
                              })
                            }
                          </div>
                          : ''
                      }
                    </div>
                    : ''
                }
              </div>
            </div>
          </div>
          :
          <span className={style.select_none}>오브젝트를 선택해주세요</span>
        }
      </div>
    </Window>
  );
}