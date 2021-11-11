import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
const base_html =
  '<!DOCTYPE html><html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>\n \n</html>';
const base_js = "";
const base_css = "";
const MonacoEditor = () => {
  const router = useRouter();
  const [SelectedLang, setSelectedLang] = useState("html");
  const [baseContent, setBaseContent] = useState("");
  function refreshEditorContent(SelectedLang) {
    fetch("api/getSavedData", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ language: SelectedLang }),
    })
      .then((responze) => responze.json())
      .then((data) => {
        //console.log(data.data);
        if (data.data != "" || data.data == null || data.data == undefined) {
          setBaseContent(data.data);
        } else {
          switch (SelectedLang) {
            case "html":
              setBaseContent(base_html);
              break;
            case "javascript":
              setBaseContent(base_js);
              break;
            case "css":
              setBaseContent(base_css);
              break;
            default:
              break;
          }
          setBaseContent();
        }
      });
  }

  const monaco = useMonaco();
  // Ezzel meglehet szerezni a tartalmát az editornak
  const editorRef = useRef(null);
  //Ez szedi ki a Monaco-bol az adatot
  async function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    refreshEditorContent(SelectedLang);
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
      body: JSON.stringify({ language: SelectedLang, editorContent: value }),
    });
  }
  return (
    <>
      <button
        onClick={() => {
          setSelectedLang("html");
          refreshEditorContent("html");
        }}
      >
        HTML
      </button>
      <button
        onClick={() => {
          setSelectedLang("css");
          refreshEditorContent("css");
        }}
      >
        CSS
      </button>
      <button
        onClick={() => {
          setSelectedLang("javascript");
          refreshEditorContent("javascript");
        }}
      >
        JavaScript
      </button>
      <h2>Seleced language :{SelectedLang}</h2>
      <Editor
        defaultLanguage={SelectedLang}
        defaultValue={baseContent}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        theme="vs-dark"
        language={SelectedLang}
        loading="Prepear to code"
        value={baseContent}
      />
    </>
  );
};

export default MonacoEditor;
