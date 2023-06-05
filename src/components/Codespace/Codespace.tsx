import React, { useState, useRef, useEffect } from "react";
import Editor, { OnChange, useMonaco } from "@monaco-editor/react";
import style from "./Codespace.module.scss";
import Window from "@/components/Wrapper/Wrapper";
import { useBoundStore } from "@/store";
import { file } from '@/types'
import Declaration_types from '@/types/sandeditor/types.d.ts?raw';

export default function WorkSpace() {
  function WorkMenu() {
    const [workMenu, setWorkMenu] = useState<file[]>([
      {
        fullName: "asd.sdcod",
        fileName: "asd",
        extension: "sdcod",
      },
      {
        fullName: "qwe.sdcod",
        fileName: "qwe",
        extension: "sdcod",
      },
    ]);

    const [selectedMenu, setSelectedMenu] = useState(1);

    return (
      <div className={style.workMenu}>
        {workMenu.map(({ fileName, extension }, i) => (
          <div
            className={
              selectedMenu === i
                ? `${style.menuItemSelected} ${style.menuItem}`
                : style.menuItem
            }
            key={i}
          >
            <span className={style.menuItemContent}>{fileName}</span>.
            {extension}
          </div>
        ))}
      </div>
    );
  }

  const { codes, setCodes } = useBoundStore();
  const monaco = useMonaco();
  const language = "typescript";

  const editorOnChange = (code: any) => {
    // setCodes("asd", code);

    // try {
    //   let aaa = new Function(code);
    //   aaa();
    // } catch (e) {
    //   console.error(e);
    // }
  }

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
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
      <Editor
        theme="vs-dark"
        language={language}
        onChange={editorOnChange}
        path={'file:///index.ts'}
        options={{
          fontSize: 18
        }}
      />
    </div>
  );
}
