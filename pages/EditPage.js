import MonacoEditor from "../components/Editor";
import EditorPage from "../styles/Editor.module.css";
import FileManagger from "../components/FileManagger";
const EditPage = () => {
  return (
    <div className={EditorPage.editorCanvas}>
      <h1>Editor</h1>
      <div className={EditorPage.workingSpace}>
        <FileManagger />
        <div className={EditorPage.Editor}>
          <MonacoEditor />
        </div>
        <iframe
          scrolling="no"
          className={EditorPage.Output}
          src="http://localhost:3001/"
        ></iframe>
      </div>
    </div>
  );
};

export default EditPage;
