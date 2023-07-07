import React, { useState, useRef, useEffect } from "react";
import Editor, { OnChange, useMonaco } from "@monaco-editor/react";
import style from "./Codespace.module.scss";
import { useBoundStore } from "@/store";
import { file } from '@/types'
import Declaration_types from '@/types/sandeditor/types.d.ts?raw';

import { ReactComponent as CloseSVG } from '@assets/image/icon/codespace/close.svg';
import { ReactComponent as IconSVG } from '@assets/image/icon_full.svg';

import scssVaribles from '@assets/scss/_variables.scss'

export default function WorkSpace() {
  const { codeFiles, setCodeFiles, workMenu, setWorkMenu, selectedWorkMenu, setSelectedWorkMenu } = useBoundStore();

  let tmp = scssVaribles.replace(':export ', '');
  let scssLabel = tmp.match(/\w+(?=:\s)/g);
  let scssValue = tmp.match(/(?<=: )[^;]+(?=;)/g);
  let scssVariblesJson: { [key: string]: string } = {};

  scssLabel?.forEach((label, index) => {
    scssVariblesJson[label] = scssValue![index];
  })

  function WorkMenu() {
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
            <span>
              <span className={style.menuItemContent}>{fileName}</span>
              .
              {extension}
            </span>

            <div className={style.close} onClick={() => { closeWorkMenu(i) }}><CloseSVG /></div>
          </div>
        ))}
      </div>
    );
  }

  const monaco = useMonaco();
  const language = "typescript";

  const editorOnChange = (code: string | undefined) => {
    if (!code || selectedWorkMenu == null) return;

    let params = {};
    let tokens = code.split(' ');
    let propTokenIndex = tokens.indexOf("_properties")
    let endBucketIndex = tokens.indexOf("}");
    let aaaa;
    let json;

    if (tokens[propTokenIndex + 1] == "=" && tokens[propTokenIndex + 2] == "{") {
       aaaa = tokens.slice(propTokenIndex + 2, endBucketIndex).join(" ");
       aaaa.split(',');
       aaaa.replace(asdd, a);
    }

    json = JSON.pharse(aaaa);

    for(let key in json) {
      
    }

    if (idx == -1) return;
    // Error 컴포넌트에 에러발생?

    setCodeFiles(workMenu[selectedWorkMenu].fileName, {
      contents: code,
      params
    });
  }

  useEffect(() => {
    if (!monaco) return;

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
  }, [monaco])

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
  );
}
