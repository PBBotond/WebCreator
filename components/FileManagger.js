import { Component, useEffect, useState } from "react";
import EditorPage from "../styles/Editor.module.css";
import { getActualUserFile } from "../lib/getActuallUserFiles";
export class FileManagger extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.refreshFiles();
  }

  ClickHandler(type, Name) {
    //console.log(type, Name);
    
  }
  render() {
    return (
      <div className={EditorPage.Files}>
        <ul>
          {this.props.l1Files.map((elem, i) => {
            console.log(elem);
            var listRs = (
              <li onClick={() => this.ClickHandler(elem.type, elem.fileName)}>
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
