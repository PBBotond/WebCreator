import MonacoEditor from "../components/Editor";
import EditorPage from "../styles/Editor.module.css";
import FileManagger from "../components/FileManagger";
import { getActualUserFile } from "../lib/getActuallUserFiles";
import { useEffect, useState } from "react";
const EditPage = ({ userId }) => {
  const [SelectedFile, setSelectedFile] = useState("");
  const [l1Files, setl1Files] = useState([]);
  function refreshFiles() {
    getActualUserFile(userId).then((response) => {
      setl1Files(response.fileData);
    });
  }
  return (
    <div className={EditorPage.editorCanvas}>
      <h1>Editor</h1>
      <div className={EditorPage.workingSpace}>
        <FileManagger
          userId={userId}
          refreshFiles={refreshFiles}
          l1Files={l1Files}
          refreshEditor={setSelectedFile}
          selectedfile={SelectedFile}
        />
        <div className={EditorPage.Editor}>
          <MonacoEditor
            userId={userId}
            refreshFiles={refreshFiles}
            selectedfile={SelectedFile}
          />
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
export function getServerSideProps({ req, res }) {
  console.log(req.cookies?.UserId);
  var userId = req.cookies?.UserId;
  if (userId == undefined) {
    userId = 0;
  }
  return { props: { userId } };
}
