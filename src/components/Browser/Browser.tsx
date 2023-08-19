import { useState } from 'react';
import style from './Browser.module.scss';
import Window from '@/components/Wrapper/Wrapper';
import { useBoundStore } from "@/store";

import example from '@assets/example1.png';
import { ReactComponent as AddSVG } from '@assets/image/icon/add.svg';
import { ReactComponent as ControllerSVG } from '@assets/image/icon/browser/controller.svg';

export default function Folder() {
  const { codeFiles, setCodeFiles, workMenu, setWorkMenu, selectedWorkMenu, setSelectedWorkMenu } = useBoundStore();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const selectFile = (filename: string) => {
    setSelectedFile(filename);
    setWorkMenu([...workMenu, { fullName: filename, fileName: filename, extension: "" }]);

    if (selectedWorkMenu) {
      setSelectedWorkMenu(selectedWorkMenu + 1);
    } else {
      setSelectedWorkMenu(0);
    }
  }

  const addObject = () => {
    let filename = Math.random().toString();
    setCodeFiles(filename, { contents: '', params: [] });
    setWorkMenu([...workMenu, { fullName: filename, fileName: filename, extension: "" }]);
  }

  return (
    <Window>
      <div className={style.topBar}>
        <i>C:/users/user/desktop/game</i>
        <button className={style.topBar_back}></button>
        <button className={style.topBar_add} onClick={addObject} title='컨트롤러 추가'><AddSVG /></button>
      </div>
      <div className={style.folder}>
        {/* <div className={style.file}><img src={example} alt='야쓰'></img><span>1111</span></div>
        <div className={style.file}><img src={example} alt='야쓰'></img><span>222222</span></div> */}

        {
          Object.entries(codeFiles).map(([filename, file], index) => {
            let isSelected = selectedFile == filename;

            return (
              <div className={`${style.file} ${isSelected ? style.file_selected : ''}`} key={index} onClick={() => { selectFile(filename) }}>
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