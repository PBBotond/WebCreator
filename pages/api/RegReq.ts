import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'
import cookie from 'cookie'

export default async function RegReq(req: NextApiRequest, res: NextApiResponse) {
    
    const db = new dbconnect(connectiondata);
    if (req.method === "POST") {
        const { name, email, password, source, newToken } = req.body;
        //console.log("RegReq");
        //console.log(req.body);

        const result = await db.getUserByEmail(email)
        //console.log(result);
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
            const result = await db.regNewUser({ name,email, password, source });
            if (result.status === "OK") {
                const refToken = await db.setToken(email, newToken)
                if (refToken.status === "OK") {
                    res.json({
                        userName: result.userName,
                        Message: "New User Created"
                    });
                } else {
                    res.json({
                        Message: "TokenError",
                        userName: result.userName
                    });
                }
            }
        }
    } else {
        res.json({Message : "Only POST" })
    }
}