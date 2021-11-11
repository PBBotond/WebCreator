const fs = require("fs");
import NextCors from "nextjs-cors";
import Editor from "../../components/Editor";

function getDataFromFile(Type) {
  return fs.readFileSync(
    "DB/editorContent_" + Type + ".txt",
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).send({
          message:
            "Some error happend when downloading, sheck for more information on console",
        });
      }
    }
  );
}
export default async function getSavedData(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  var file;
  if (req.method === "POST") {
    switch (req.body.language) {
      case "html":
        file = getDataFromFile("html");
        break;
      case "javascript":
        file = getDataFromFile("javascript");
        
        break;
      case "css":
        file = getDataFromFile("css");
        break;
      default:
        res.status(400).send({ message: "Not acceptable file type" });
        return;
    }
    console.log("Sending Data");
    res.status(200).json({ data: file });
  } else if (req.method === "GET") {
    const data_html = getDataFromFile("html");
    const data_js = getDataFromFile("javascript");
    const data_css = getDataFromFile("css");
    res.status(200).json({ data_html, data_js, data_css });
  } else {
    res.status(400).send({ message: "Only GET request is allowed" });
    return;
  }
}
