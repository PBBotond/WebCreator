import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../../DB/dbconect'
import connectiondata from '../../../DB/dbconfig'

export default async function SaveNewFile(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { file } = req.query as { file: string }
        const db = new dbconnect(connectiondata);
        const fileData = await db.getFile(file)
        res.status(200).json({message: 'OK',fileData})
    } else {
        res.status(400).send({ message: "Only POST request is allowed" })
    }
}
