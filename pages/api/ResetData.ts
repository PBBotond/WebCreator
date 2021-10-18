import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'
import { verify } from "jsonwebtoken";
export default async function ResetData(req: NextApiRequest, res: NextApiResponse) {
    if (req.method==="POST") {
        const db = new dbconnect(connectiondata);
        if ("AuthToken" in req.cookies) {  
            const email = verify(req.cookies.AuthToken, process.env.AUTHSECRET)
            const result = await db.getUserByEmail(email)
            if (result.status === "OK") {
                res.json({
                    Message: "OK",
                    userName: result.userName,
                    userMail: result.userMail
                })
            }
        } else {
            res.json({message:"NoToken"})
        }
    } else {
        res.json({message:"Only POST accepted"})
    }
    
}