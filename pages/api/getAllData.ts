import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'

export default async function getAllData(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const bodyReq = req.body
        console.log(bodyReq);
        console.log(req.body.data);
        
        const db = new dbconnect(connectiondata);
        const result = await db.getAll('logintable');
        res.status(200).json({message: 'OK',result})
    } else {
        res.status(400).send({ message: "Only POST request is allowed" })
        return
    }
    
}
