import { Component, useEffect, useState } from "react";
import EditorPage from "../styles/Editor.module.css";
export class FileManagger extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.refreshFiles();
  }

  async getSelectedFile(path, name) {
    const fileContent = await (
      await fetch("api/getSavedData/" + this.props.userId, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          path: path + "/" + name,
        }),
      })
    ).json();
    return fileContent.data;
  }
  async ClickHandler(id) {
    const fileData = await (await fetch("api/database/" + id)).json();
    if (fileData.message == "OK") {
      if (fileData.fileData.type == "dir") {
        //console.log("This is dir  " + type);
      } else {
        //console.log("This is file  " + type);
        const content = await this.getSelectedFile(
          fileData.fileData.filePath,
          fileData.fileData.fileName
        );
        var type = fileData.fileData.type;
        type = type == "js" ? "javascript" : type;
        this.props.refreshEditor({
          content,
          path: fileData.fileData.filePath + "/" + fileData.fileData.fileName,
          type,
          id,
        });
      }
    }
  }
  render() {
    return (
      <div className={EditorPage.Files}>
        <ul>
          {this.props.l1Files.map((elem, i) => {
            //console.log(elem);
            var listRs = (
              <li
                onClick={() => this.ClickHandler(elem.id)}
                className={
                  this.props.selectedfile.id == elem.id
                    ? EditorPage.selected
                    : "notSelected"
                }
              >
                {elem.fileName}
              </li>
            );
            return listRs;
          })}
        </ul>
      </div>
    );
  }
}
export default FileManagger;
