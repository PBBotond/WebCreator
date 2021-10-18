import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'
import cookie from 'cookie'
import { sign } from "jsonwebtoken";

export default async function AuthUser(req: NextApiRequest, res: NextApiResponse) {
    
    const db = new dbconnect(connectiondata);
    if (req.method === "POST") {
        const { email, password, source } = req.body;
        console.log("AuthUser");
        console.log(req.body);
        const newToken = sign(email, process.env.AUTHSECRET);
        console.log(newToken);
        
        const result = await db.getUserByEmail(email)
        console.log(result);
        if (result.status === "OK") {
            if (result.userPass === password) {
                const refToken = await db.setFreshToken(email, newToken)
                if (refToken.status === "OK") {
                    res.setHeader("Set-Cookie",
                        cookie.serialize("AuthToken", newToken, {
                            httpOnly: true,
                            maxAge: 3600,
                            path:"/"
                        }));
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
                
            } else {
                res.json({ Message: "BadPass" })
            }
        } else {
            res.json({ Message: "NotFound" })
        }
    } else {
        res.json({Message : "Only POST" })
    }
}