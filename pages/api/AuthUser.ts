import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'

export default async function AuthUser(req: NextApiRequest, res: NextApiResponse) {
    
    const db = new dbconnect(connectiondata);
    if (req.method === "POST") {
        const { email, password } = req.body;
        console.log(req.body);
        
        const result = await db.getUserByEmail(email)
        console.log(result);
        if (result.status === "OK") {
            if (result.userPass === password) {
                res.json({ Message: "OK" })
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