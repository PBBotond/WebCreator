import { NextApiResponse, NextApiRequest } from "next";
import dbconnect from '../../DB/dbconect'
import connectiondata from '../../DB/dbconfig'
const fs = require('fs')
export default async function testApi(req: NextApiRequest, res: NextApiResponse) {
   
   /* const db = new dbconnect(connectiondata);
    const result =await db.getAll("test");
     res.json({result : result})*/
    
}
