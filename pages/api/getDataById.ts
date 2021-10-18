import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'

export default async function gatDataById(req: NextApiRequest, res: NextApiResponse) {
    
    const db = new dbconnect(connectiondata);
    const result = await db.getById(13);
     res.json(result)
}
