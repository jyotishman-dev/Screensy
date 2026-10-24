import type { NextFunction, Request, Response } from "express";



import { verifyAuthToken } from "../lib/jwt.js";


declare global {
    namespace  Express {
        interface Request {
            user?:{
                id : string , 
                email : string
            }
        }
    }
}




export async function  requireAuth(req: Request ,  res : Response  , next : NextFunction) {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer")?header.slice("Bearer".length) : undefined

    if (!token) {
    res.status(401).json({ error: "Missing Authorization bearer token" });
    return;
  }


  try {
    const payload = verifyAuthToken(token)

    req.user = {id : payload.sub, email : payload.email}

    next();
}
catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }

}