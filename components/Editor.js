import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

const MonacoEditor = ({ data }) => {
  var testfile;
  const router = useRouter();
  const baseLanguage = "html";
  const [SelectedLang, setSelectedLang] = useState("html");

  const monaco = useMonaco();
  // Ezzel meglehet szerezni a tartalmát az editornak
  const editorRef = useRef(null);
  //Ez szedi ki a Monaco-bol az adatot
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log(monaco.languages.getLanguages());
  }
  //Mielött a Monaco betöltödne itt lehet beáll
  function handleEditorWillMount(monaco) {
    console.log("Monaco is loading");
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  async function RunPage() {
    const editorContent = editorRef.current.getValue();
    const response = await fetch("/api/saveData", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ editorContent }),
    });
    router.push("/Runnable");
    // fs.writeFile("../pages/Runnable.js", editorRef.current.getValue());
  }
  //Sima OnChange müvelet de nem baj ha itt van legalább látszik
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }
  return (
    <>
      <button onClick={() => setSelectedLang("html")}>HTML</button>
      <button onClick={() => setSelectedLang("css")}>CSS</button>
      <button onClick={() => setSelectedLang("javascript")}>JavaScript</button>
      <h2>Seleced language :{SelectedLang}</h2>
      <button onClick={RunPage}>Run</button>
      <Editor
        height="90vh"
        defaultLanguage={SelectedLang}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        theme="vs-dark"
        language={SelectedLang}
        loading="Prepear to code"
      />
    </>
  );
};

export default MonacoEditor;
