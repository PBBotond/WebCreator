const fs = require("fs");
export default function getSavedData(req, res) {
  if (req.method === "GET") {
    console.log(req.body.data);
    const dataa = fs.readFileSync("DB/test.js", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).send({
          message:
            "Some error happend when downloading, sheck for more information on console",
        });
      }
    });
    console.log("Sending Data");

    res.status(200).json({ data: dataa });
  } else {
    res.status(400).send({ message: "Only GET request is allowed" });
    return;
  }
}
