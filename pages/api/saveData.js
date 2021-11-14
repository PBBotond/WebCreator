const fs = require("fs");
export default function saveData(req, res) {
  if (req.method === "POST") {
    var filePath = "";
    console.log("In Save Data");
    const { language, editorContent, userId } = req.body;
    switch (language) {
      case "html":
        filePath = "starter.html";
        break;
      case "javascript":
        filePath = "starter.js";
        break;
      case "css":
        filePath = "starter.css";
        break;
      default:
        res.status(400).send({ message: "Not acceptable file type" });
        return;
    }
    fs.writeFileSync(
      "DB/SavedFiles/" + userId + "/" + filePath,
      editorContent,
      (err) => {
        if (err) {
          console.error(err);
          res.status(404).send({
            message: "Some error happend while uploading, check console",
          });
          return;
        }
      }
    );

    res.status(200).json({ message: "OK" });
  } else {
    res.status(400).send({ message: "Only POST request is allowed" });
    return;
  }
}
