import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../../DB/dbconect'
import connectiondata from '../../../DB/dbconfig'

export default async function GetFile(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const query = req.query
        const db = new dbconnect(connectiondata);
        if (query.by=="email") {
            const user = await db.getUserByEmail(query.email)
            res.status(200).json({message: 'OK',user})
        } else {
            const user = await db.getById(query.id)
            res.status(200).json({message: 'OK',user})
        }
    } else {
        res.status(400).send({ message: "Only GET request is allowed" })
    }
}
