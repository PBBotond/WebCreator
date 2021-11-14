import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

const MonacoEditor = (props) => {
  const router = useRouter();
  const [SelectedLang, setSelectedLang] = useState("html");
  const [baseContent, setBaseContent] = useState("");
  const [fileName, setfileName] = useState("");
  function CheckFileName(name) {
    if (name != "") {
      const type = name.split(".").pop();
      return type == "html" || type == "js" || type == "css";
    }
    return false;
  }
  function saveActualFile() {
    var fileType = fileName.split(".");
    fileType = fileType.length == 1 ? "dir" : fileType.pop();
    fetch("api/database/SaveNewFile", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        fileName,
        type: fileType == "" ? "dir" : fileType,
        userId: props.userId,
        filePath: "DB/SavedFiles/" + props.userId,
      }),
    }).then(() => props.refreshFiles());
  }

  const monaco = useMonaco();
  // Ezzel meglehet szerezni a tartalmát az editornak
  const editorRef = useRef(null);
  //Ez szedi ki a Monaco-bol az adatot
  async function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  //Mielött a Monaco betöltödne itt lehet beáll
  function handleEditorWillMount(monaco) {
    //console.log("Monaco is loading");
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }
  //Sima OnChange müvelet de nem baj ha itt van legalább látszik
  function handleEditorChange(value, event) {
    //console.log("here is the current model value:", value);
    fetch("/api/saveData", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        path: props.selectedfile.path,
        editorContent: value,
      }),
    });
  }
  return (
    <>
      <input type="text" onChange={(e) => setfileName(e.target.value)} />
      <button
        onClick={() => {
          if (CheckFileName(fileName)) {
            saveActualFile();
          } else {
            console.log("Not valid name");
          }
        }}
      >
        Create as File
      </button>
      <button
        onClick={() => {
          if (fileName !== "") {
            saveActualFile();
          } else {
            console.log("Name Required!");
          }
        }}
      >
        Create as Folder
      </button>
      <h2>Seleced language :{props.selectedfile.type}</h2>
      <Editor
        defaultLanguage={props.selectedfile.type}
        defaultValue={baseContent}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        theme="vs-dark"
        language={props.selectedfile.type}
        loading="Prepear to code"
        value={props.selectedfile.content}
      />
    </>
  );
};

export default MonacoEditor;
