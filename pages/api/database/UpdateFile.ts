import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../../DB/dbconect'
import connectiondata from '../../../DB/dbconfig'

export default async function SaveNewFile(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {id,fields} = req.body
        
        const db = new dbconnect(connectiondata);
        const result = await db.updateExistingFile(id,fields);

        res.status(200).json(result)
    } else {
        res.status(400).send({ message: "Only POST request is allowed" })
        return
    }
}
