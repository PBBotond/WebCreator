const fs = require("fs");
import NextCors from "nextjs-cors";
import Editor from "../../../components/Editor";

function getDataFromFile(Type, id) {
  if (id == 0) {
    /*Ha a user guest vagy nem rendelkezik tokennel*/
    return fs.readFileSync(
      "DB/SavedFiles/editorContent_" + Type + ".txt",
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
  } else {
    return fs.readFileSync(
      "DB/SavedFiles/" + id + "/starter." + Type,
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
}
export default async function getSavedData(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  var file;
  const { userId } = req.query;
  const { language } = req.body;
  if (req.method === "POST") {
    switch (language) {
      case "html":
        file = getDataFromFile("html", userId);
        break;
      case "javascript":
        file = getDataFromFile("js", userId);

        break;
      case "css":
        file = getDataFromFile("css", userId);
        break;
      default:
        res.status(400).send({ message: "Not acceptable file type" });
        return;
    }
    console.log("Sending Data to Projector");
    res.status(200).json({ data: file });
  } else if (req.method === "GET") {
    const data_html = getDataFromFile("html", userId);
    const data_js = getDataFromFile("js", userId);
    const data_css = getDataFromFile("css", userId);
    res.status(200).json({ data_html, data_js, data_css });
  } else {
    res.status(400).send({ message: "Only GET request is allowed" });
    return;
  }
}
