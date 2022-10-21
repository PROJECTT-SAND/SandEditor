import React, { useState, useRef } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import style from "./Workspace.module.scss";
import Window from "../Window/Window.tsx";
import useStore from "../../store";
import { monarchLanguage } from "./SendBoxCodeLang";

export default function WorkSpace() {
  function WorkMenu() {
    const [workMenu, setWorkMenu] = useState([
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

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    monaco.languages.register({ id: languageID });
    monaco.languages.setMonarchTokensProvider(languageID, monarchLanguage);
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  // useStore.setState({codes: , ...useStore});

  return (
    <div className={style.workSpace}>
      <WorkMenu />
      <Window customStyle={{ borderRadius: "0px 0px 15px 15px" }}>
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
