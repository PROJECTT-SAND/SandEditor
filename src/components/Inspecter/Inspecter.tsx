import style from './Inspecter.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { useBoundStore } from "@/store";
import { ReactComponent as ArrowDownSVG } from '@assets/image/icon/object/arrow_down.svg';
import { ReactComponent as ControllerSVG } from '@assets/image/icon/inspecter/controller.svg';

export default function Folder() {
  const { objectDatas, setObjectDatas, selectedObjectUUID, codeFiles } = useBoundStore();

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
            {
              Object.entries(objectDatas[selectedObjectUUID]).map(([key, value], index) => {
                return (
                  <div className={style.property} key={index}>
                    <div className={style.label}>{key}</div>
                    <input type="text" value={value ?? ''} onInput={(e) => { setObjectParam(key, e.currentTarget.value) }}></input>
                  </div>
                )
              })
            }

            <div className={style.container}>
              <div>
              <span className={style.button_arrow}><ArrowDownSVG /></span>
              <input className={style.dsdadf} type="checkbox"></input>
              <span className={style.container_icon}><ControllerSVG /></span>
              <div className={style.label}>asdf.sand</div>
              </div>

              //<select onInput={asdf}>
              //  {//Object.keys(codeFiles).map((fileName, index) => {
              //    return <option value={fileName} key={index} onInput={(e) => { setObjectParam('Controller', e.currentTarget.value) }}>{fileName}</option>
              //  })
                }
              </select>
              <button className={style.options}>...</button>
            </div>

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

            <button className={style.btnAdd}>Add Controller</button>
            <button className={style.btn_delete}></button>

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