const fs = require("fs");
export default function saveData(req, res) {
  if (req.method === "POST") {
    var filePath = "";
    console.log("In Save Data");
    const { editorContent, path } = req.body;

    fs.writeFileSync(path, editorContent, (err) => {
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
