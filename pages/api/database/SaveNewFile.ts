import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../../DB/dbconect'
import connectiondata from '../../../DB/dbconfig'

export default async function SaveNewFile(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {fileName,type,userId,filePath} = req.body
        
        const db = new dbconnect(connectiondata);
        const result = await db.saveNewFile(fileName, type, userId, filePath);

        res.status(200).json(result)
    } else {
        res.status(400).send({ message: "Only POST request is allowed" })
        return
    }
}
