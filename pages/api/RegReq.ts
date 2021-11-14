import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'
import fs from "fs";
const base_html =
  '<!DOCTYPE html><html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>\n \n</html>';
const base_js = "";
const base_css = "";
function CreateUserFolder(id) {
    const dir = 'DB/SavedFiles/' + id;
    console.log("CreateNewFoler");
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
        fs.writeFile(dir+'/starter.html',base_html, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        })
        fs.writeFile(dir+'/starter.js', base_js, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        })
        fs.writeFile(dir+'/starter.css', base_css, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        })
    }
}

export default async function RegReq(req: NextApiRequest, res: NextApiResponse) {
    
    const db = new dbconnect(connectiondata);
    if (req.method === "POST") {
        const { name, email, password, source, newToken } = req.body;
        //console.log("RegReq");
        //console.log(req.body);

        const result = await db.getUserByEmail(email)
        console.log(result);
        if (result.status === "OK") {
            if (result.source === "Custom" && source === "Custom") {
                res.json({Message: "Already created"})
            } else {
                res.json({ Message: "Connect to annother source registration" })
                const refToken = await db.setFreshToken(email, newToken)
                if (refToken.status==="OK") {
                    res.json({
                        Message: "OK",
                        userName: result.userName
                    })
                } else {
                    res.json({
                        Message: "TokenError",
                        userName: result.userName
                    })
                }
            }
        } else {
            const resultNew = await db.regNewUser({ name, email, password, source });
            if (resultNew.status === "OK") {
                const refToken = await db.setToken(email, newToken)
                if (refToken.status === "OK") {
                    res.json({
                        userName: resultNew.userName,
                        Message: "New User Created"
                    });
                } else {
                    res.json({
                        Message: "TokenError",
                        userName: resultNew.userName
                    });
                }
            }
            const result = await db.getUserByEmail(email)
            CreateUserFolder(result.id);
        }
    } else {
        res.json({Message : "Only POST" })
    }
}