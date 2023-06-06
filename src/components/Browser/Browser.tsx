import style from './Browser.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import example from '@assets/example1.png';
import { useBoundStore } from "@/store";

import { ReactComponent as AddSVG } from '@assets/icon/add.svg';
import { ReactComponent as ControllerSVG } from '@assets/icon/browser/controller.svg';
import { useState } from 'react';

export default function Folder() {
  const { codeFiles, setCodeFiles } = useBoundStore();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const addObject = () => {
    setCodeFiles(Math.random().toString(), { contents: '', params: {} });
  }



  return (
    <Window>
      <div className={style.topBar}>
        <i>C:/users/user/desktop/game</i>
        <button className={style.topBar_back}></button>
        <button className={style.topBar_add} onClick={addObject}><AddSVG /></button>
      </div>
      <div className={style.folder}>
        {/* <div className={style.file}><img src={example} alt='야쓰'></img><span>1111</span></div>
        <div className={style.file}><img src={example} alt='야쓰'></img><span>222222</span></div> */}

        {
          Object.entries(codeFiles).map(([filename, file], index) => {
            let isSelected = selectedFile == filename;

            return (
              <div className={`${style.file} ${isSelected ? style.file_selected : ''}`} key={index} onClick={() => { setSelectedFile(filename) }}>
                <ControllerSVG />
                <span>{filename}</span>
              </div>
            )
          })
        }
      </div>
    </Window>
  );
}