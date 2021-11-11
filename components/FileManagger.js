import { useState } from "react";
import EditorPage from "../styles/Editor.module.css";
var temp = ["alma", "korte", "barack", "kacsa", "mama", "tata"];
var temp2 = ["alma", "korte", "barack", "kacsa", "mama", "tata"];

const FileManagger = () => {
  const [listItem, setlistItem] = useState(temp);
  const [listItemlev, setlistItemlev] = useState(null);

  function generateDeeper(index) {
    const result = [{ i: index, data: temp2 }];
    setlistItemlev(result);
  }

  return (
    <div className={EditorPage.Files}>
      <ul>
        {listItem.map((elem, i) => {
          var listRs = <li onClick={() => generateDeeper(i)}>{elem}</li>;
          listItemlev?.map((elemlev, t) => {
            if (elemlev.i == t) {
              var actualData = elemlev.data;
              listRs = (
                <>
                  {listRs}
                  {actualData.map((listelem) => (
                    <li onClick={() => generateDeeper(i)}>{listelem}</li>
                  ))}
                </>
              );
            }
          });
          return listRs;
        })}
      </ul>
    </div>
  );
};
export default FileManagger;
