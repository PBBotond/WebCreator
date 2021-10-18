// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require("fs");
export default function handler(req, res) {
  const dataa = fs.readFileSync("pages/api/helllo.txt", "utf8", (err, data) => {
    console.log(data);
  });
  console.log(dataa);

  res.status(200).json({ name: dataa });
}
