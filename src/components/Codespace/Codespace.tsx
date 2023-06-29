import React, { useState, useRef, useEffect } from "react";
import Editor, { OnChange, useMonaco } from "@monaco-editor/react";
import style from "./Codespace.module.scss";
import { useBoundStore } from "@/store";
import { file } from '@/types'
import Declaration_types from '@/types/sandeditor/types.d.ts?raw';

import { ReactComponent as CloseSVG } from '@assets/image/icon/codespace/close.svg';

export default function WorkSpace() {
  const { codeFiles, setCodeFiles, workMenu, setWorkMenu, selectedWorkMenu, setSelectedWorkMenu } = useBoundStore();

  function WorkMenu() {
    const closeWorkMenu = (index: number) => {
      if (selectedWorkMenu == null) return;
      let tmp = [...workMenu];
      tmp.splice(index, 1);

      setWorkMenu(tmp);

      if (selectedWorkMenu == 0) {
        setSelectedWorkMenu(null);
      } else {
        setSelectedWorkMenu((selectedWorkMenu - 1));
      }
    }

    const selectWorkMenu = (index: number) => {
      setSelectedWorkMenu(index);
    }

    return (
      <div className={style.workMenu}>
        {workMenu.map(({ fileName, extension }, i) => (
          <div
            className={
              `${selectedWorkMenu === i ? style.menuItemSelected : ''} ${style.menuItem}`
            }
            key={i}
            onClick={() => { selectWorkMenu(i) }}
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

    setCodeFiles(workMenu[selectedWorkMenu].fileName, {
      contents: code,
      params: {}
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
    // monaco.editor.defineTheme()
  }, [monaco])

  return (
    <div className={style.workSpace}>
      <WorkMenu />

      <div className={style.editor_wrap}>
        {selectedWorkMenu != null ?
          <Editor
            theme="vs-dark"
            language={language}
            onChange={editorOnChange}
            path={'file:///index.ts'}
            options={{
              fontSize: 15,
              tabSize: 2
            }}
          />
          : ''
        }
      </div>
    </div>
  );
}
