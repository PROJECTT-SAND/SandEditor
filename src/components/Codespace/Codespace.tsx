import React, { useState, useEffect } from "react";
import Editor, { OnChange, useMonaco } from "@monaco-editor/react";
import style from "./Codespace.module.scss";
import { useBoundStore } from "@/store";
import Declaration_types from '@/utils/sandeditor/types.d.ts?raw';
import scssVaribles from '@assets/scss/_variables.scss'

import { ReactComponent as CloseSVG } from '@assets/image/icon/codespace/close.svg';
import { ReactComponent as IconSVG } from '@assets/image/icon_full.svg';

export default function WorkSpace() {
  let [scssVariblesJson, setScssVariblesJson] = useState<{ [key: string]: string }>();
  const { selectedWorkMenu } = useBoundStore();

  const monaco = useMonaco();
  const language = "typescript";

  // const editorOnChange = (code: string | undefined) => {
  //   if (!code || selectedWorkMenu == null) return;

  //   let params = {};
  //   let tokens = code.split(' ');
  //   let propTokenIndex = tokens.indexOf("_properties")
  //   let endBucketIndex = tokens.indexOf("}");
  //   let aaaa;
  //   let json;
  //   let newJson;

  //   if (tokens[propTokenIndex + 1] == "=" && tokens[propTokenIndex + 2] == "{") {
  //     aaaa = tokens.slice(propTokenIndex + 3, endBucketIndex).join(" ");
  //     aaaa.split(',');
  //   }

  //   for (let item of aaaa) {
  //     let label = item.match(/\w+(?=:\s)/g)[0];
  //     let func = item.match(/(?<=:)[^(]+/g)[0];
  //     let funcArgs = item.match(/(?<=\()[^)]+/g)[0].split(',');

  //     switch (func) {
  //       case 'newSliderProp':
  //         if (props.length < 2) return;

  //         params[label] = new sliderArg(...funcArgs);
  //         break;
  //     }
  //   }

  //   setCodeFiles(workMenu[selectedWorkMenu].fileName, {
  //     contents: code,
  //     params
  //   });
  // }

  const editorOnChange = (code: string | undefined) => {
    const { setCodeFiles, workMenu, selectedWorkMenu } = useBoundStore.getState();

    if (!code || selectedWorkMenu == null) return;

    setCodeFiles(workMenu[selectedWorkMenu].fileName, {
      contents: code,
      params: []
    });

    let tokens = code.replaceAll('\n', ' ').replaceAll('\r', '').split(' ').filter((value) => value !== '');
    let propTokenIndex = tokens.indexOf("_properties")
    let endBucketIndex = tokens.indexOf("}");
    let aaaa;
    let json: any = {};

    if (propTokenIndex === -1 || endBucketIndex === -1 || tokens[propTokenIndex + 1] !== "=" || tokens[propTokenIndex + 2] !== "{") return;

    aaaa = tokens.slice(propTokenIndex + 3, endBucketIndex).join(" ").split(',');
    aaaa.forEach((textLine) => {
      let text = textLine.trim();
      let key = text.match(/(?<=^)(.*?)(?=:)/g);
      let value = text.match(/(?<=:)(.*?)(?=$)/g);

      if (!key || !value) return;

      json[key[0].trim()] = value[0].trim();
    })
  }

  useEffect(() => {
    let tmp = scssVaribles.replace(':export ', '');
    let value: any = {};
    let scssLabel = tmp.match(/\w+(?=:\s)/g);
    let scssValue = tmp.match(/(?<=: )[^;]+(?=;)/g);

    scssLabel?.forEach((label, index) => {
      value[label] = scssValue![index];
    })

    setScssVariblesJson(value);
  }, []);

  useEffect(() => {
    if (!monaco || !scssVariblesJson) return;

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"]
    })

    monaco.languages.typescript.typescriptDefaults.setExtraLibs([
      // { content: Declaration_process, filePath: 'file:///node_modules/@types/process/index.d.ts' },
      { content: Declaration_types },
    ])
    monaco.editor.defineTheme('sandEditor', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        "editor.background": scssVariblesJson.codespace_color,
      }
    })
  }, [monaco, scssVariblesJson])

  function WorkMenu() {
    const { workMenu, setWorkMenu, selectedWorkMenu, setSelectedWorkMenu } = useBoundStore();

    const closeWorkMenu = (index: number) => {
      if (selectedWorkMenu === -1) return;

      let tmp = [...workMenu];
      tmp.splice(index, 1);

      setWorkMenu(tmp);

      if (selectedWorkMenu == 0) {
        setSelectedWorkMenu(-1);
      } else {
        setSelectedWorkMenu((selectedWorkMenu - 1));
      }
    }

    const selectWorkMenu = (e: React.MouseEvent, index: number) => {
      // @ts-ignore
      let classList = [...e.target.classList]
      if (!classList.includes('workMenu')) return;

      setSelectedWorkMenu(index);
    }

    return (
      <div className={style.workMenu}>
        {workMenu.map(({ fileName, extension }, i) => (
          <div
            className={
              `${selectedWorkMenu === i ? style.menuItemSelected : ''} ${style.menuItem} workMenu`
            }
            key={i}
            onClick={(e) => { selectWorkMenu(e, i) }}
          >
            <span className={style.menuItem_name}>
              <span className={style.menuItemContent}>{fileName}</span>
              .
              {extension}
            </span>

            <div className={style.close} onClick={() => { closeWorkMenu(i) }}><CloseSVG /></div>
            {/* <div className={style.menuItem_border}></div> */}
          </div>
        ))}
      </div>
    );
  }

  function EditorWrap() {
    const { selectedWorkMenu } = useBoundStore();
    const monaco = useMonaco();
    const language = "typescript";

    // class sliderArg {
    // let start: number;
    // let end: number;

    // constructor(start: number, end: number) {
    //   this.start = start;
    //   this.end = end;
    // }
  }

  return (
    <div className={style.workSpace}>
      <WorkMenu />

      <div className={style.editor_wrap}>
        {(selectedWorkMenu !== -1) ?
          <Editor
            theme="sandEditor"
            language={language}
            onChange={editorOnChange}
            path={'file:///index.ts'}
            options={{
              fontSize: 15,
              tabSize: 2
            }}
          />
          :
          <div className={style.editor_placeholder}>
            <IconSVG />
            <h5>SandEditor</h5>
            <span>브라우저에서 컨트롤러 파일을 선택하거나 추가하세요</span>
          </div>
        }
      </div>
    </div>
  )
}

// return (
//   <div className={style.workSpace}>
//     <WorkMenu />
//     <EditorWrap />
//   </div>
// );
// }