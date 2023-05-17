import React, { useState, useRef } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import style from "./Workspace.module.scss";
import Window from "@components/Window/Window";
import { useBoundStore } from "@/store";
import { monarchLanguage } from "@/SendBoxCodeLang";

export default function WorkSpace() {
  interface File {
    fullName: string,
    fileName: string,
    extension: string,
  }

  function WorkMenu() {
    const [workMenu, setWorkMenu] = useState<File[]>([
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

  const editorRef = useRef(null);

  const languageID = "SendBoxCodeLang";

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;

    monaco.languages.register({ id: languageID });
    monaco.languages.setMonarchTokensProvider(languageID, monarchLanguage);
  }

  // function showValue() {
  //   alert(editorRef.current.getValue());
  // }

  // useStore.setState({codes: , ...useStore});

  return (
    <div className={style.workSpace}>
      <WorkMenu />
      <Window customStyle={{ borderRadius: "10px 10px 0px 0px" }}>
        {/*
        func null start(obj:obj)
          obj.[x, y, size] = [10, 20, 100]

          for(10)
            obj.X += 10
        */}
        <Editor
          theme="vs-dark"
          defaultLanguage={languageID}
          onMount={handleEditorDidMount}
        />
      </Window>
    </div>
  );
}
