import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../../../DB/dbconect'
import connectiondata from '../../../../DB/dbconfig'

export default async function GetFileByUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId } = req.query as { userId: string }
        const db = new dbconnect(connectiondata);
        const fileData = await db.getFileByUser(userId)
        if (fileData?.status=="NotFound") {
        res.status(200).json({message: 'NotFound',fileData:[]})
        }
        else {
            res.status(200).json({message: 'OK',fileData:Array.isArray(fileData)?fileData:[fileData]})
        }
    } else {
        res.status(400).send({ message: "Only POST request is allowed" })
    }
}
