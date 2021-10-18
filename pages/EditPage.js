import MonacoEditor from "../components/Editor";
import "../styles/Editor.module.css";
const EditPage = () => {
  return (
    <div className={"editorCanvas"}>
      <h1>Editor</h1>
      <MonacoEditor />;
    </div>
  );
};

export default EditPage;
