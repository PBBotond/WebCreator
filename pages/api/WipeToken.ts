import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'
import { verify } from "jsonwebtoken";
import cookie from 'cookie'

export default async function WipeToken(req: NextApiRequest, res: NextApiResponse) {
    if (req.method==="POST") {
        const db = new dbconnect(connectiondata);
        if (req.cookies !== undefined) {
            const email = verify(req.cookies.AuthToken, process.env.AUTHSECRET)
            const result = await db.getUserByEmail(email)
            if (result.status === "OK") {
                db.delToken(email);
                console.log("DELETE TOKEN");
                
                res.setHeader("Set-Cookie",
                cookie.serialize("AuthToken", "", {
                    httpOnly: true,
                    maxAge: 0,
                     path:"/"
                }));
                res.json({message:"TokenWiped"})
            }
        } else {
            res.json({message:"NoToken"})
        }
    } else {
        res.json({message:"Only POST accepted"})
    }
    
}