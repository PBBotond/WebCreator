const fs = require("fs");
export default function saveData(req, res) {
  if (req.method === "POST") {
    var filePath = "";
    console.log("In Save Data");
    console.log(req.body);
    switch (req.body.language) {
      case "html":
        filePath = "editorContent_html.txt";
        break;
      case "javascript":
        filePath = "editorContent_javascript.txt";
        break;
      case "css":
        filePath = "editorContent_css.txt";
        break;
      default:
        res.status(400).send({ message: "Not acceptable file type" });
        return;
    }
    fs.writeFileSync("DB/" + filePath, req.body.editorContent, (err) => {
      if (err) {
        console.error(err);
        res.status(404).send({
          message: "Some error happend while uploading, check console",
        });
        return;
      }
    });

    res.status(200).json({ message: "OK" });
  } else {
    res.status(400).send({ message: "Only POST request is allowed" });
    return;
  }
}
