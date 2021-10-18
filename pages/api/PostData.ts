import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'

export default async function gatDataById(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        /*const bodyReq = JSON.parse(req.body)
        console.log(bodyReq);*/
        console.log(req.body.data);
        
        /*const db = new dbconnect(connectiondata);
        const result = await db.getById(13);*/
        res.status(200).json({message: 'OK'})
    } else {
        res.status(400).send({ message: "Only POST request is allowed" })
        return
    }
    
}
