import style from './Inspecter.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { useBoundStore } from "@/store";
import { ReactComponent as ArrowDownSVG } from '@assets/image/icon/object/arrow_down.svg';
import { ReactComponent as ControllerSVG } from '@assets/image/icon/inspecter/controller.svg';
import { OBJECT_TYPE } from '@/constants';

export default function Folder() {
  const { objectDatas, setObjectDatas, selectedObjectUUID, codeFiles } = useBoundStore();
  let ignorePropsName = ['type', 'parentUUID', 'UUID', 'name'];

  const asdf = (a: any) => {
    console.log(a)
  }

  const setObjectParam = (key: string, value: any) => {
    if (selectedObjectUUID == null) return;

    const selectedObject = objectDatas[selectedObjectUUID];
    let tmp = { ...selectedObject };
    tmp[key as keyof Object] = value;

    setObjectDatas({ ...objectDatas, [selectedObjectUUID]: tmp });
  }

  return (
    <Window>
      <div className={style.topBar}>
        <i>Inspecter</i>
      </div>
      <div className={style.Inspecter}>
        {(selectedObjectUUID != null) ?
          <div className={style.property_wrap}>
            <div className={style.objectInfo}>
              <div className={style.objectInfo_icon}>{objectDatas[selectedObjectUUID].type}</div>
              {/* <div className={style.objectInfo_name}>{objectDatas[selectedObjectUUID].name}</div> */}
              <input
                type="text"
                value={objectDatas[selectedObjectUUID].name ?? ''}
                className={style.objectInfo_name}
              ></input>
            </div>
            {
              Object.entries(objectDatas[selectedObjectUUID]).map(([key, value], index) => {
                if (ignorePropsName.includes(key)) return;

                return (
                  <div className={style.property} key={index}>
                    <div className={style.label}>{key}</div>
                    <input type="text" value={value ?? ''} onInput={(e) => { setObjectParam(key, e.currentTarget.value) }}></input>
                  </div>
                )
              })
            }

            {objectDatas[selectedObjectUUID].type == OBJECT_TYPE.Object ?
              <div className={style.container}>
                <span className={style.button_arrow}><ArrowDownSVG /></span>
                <span className={style.container_icon}><ControllerSVG /></span>
                <div className={style.label}>Controller</div>

                <select onInput={asdf}>
                  {
                    Object.keys(codeFiles).map((fileName, index) => {
                      return <option value={fileName} key={index} onInput={(e) => { setObjectParam('Controller', e.currentTarget.value) }}>{fileName}</option>
                    })
                  }
                </select>
              </div>
              : ''
            }

            {
              // Object.entries(codeFiles['qwe.sdcod'].params).map(([key, { type, value }], index) => {
              //   return (
              //     <div className={style.property} key={index}>
              //       <div className={style.label}>{key}</div>
              //       {type == 1 ?
              //         <input type="text" value={value ?? ''} onInput={asdf}></input> : ''
              //       }
              //     </div>
              //   )
              // })
            }

            {objectDatas[selectedObjectUUID].type == OBJECT_TYPE.Object ?
              <button className={style.btnAdd}>Add Controller</button>
              : ''
            }

            {/* 
            <div className={style.property}>
              <div>name</div>
              <input type="text" value={selectedObject?.name} ></input>
            </div>
            <div className={style.property}>
              <div>X</div>
              <input type="text" value={selectedObject?.X} ></input>
            </div>
            <div className={style.property}>
              <div>Y</div>
              <input type="text" value={selectedObject?.Y} ></input>
            </div> */}
          </div>
          :
          <span className={style.select_none}>오브젝트를 선택해주세요.</span>
        }
      </div>
    </Window>
  );
}