import { signupSchema } from "@screensy/common"
import type {Request, Response} from "express"
import prisma from "@screensy/db"
import { hashPassword } from "../lib/passwordHash"
import { signAuthToken } from "../lib/jwt"



export const  signup =async(req : Request , res : Response) =>{

    const parsed = signupSchema.safeParse(req.body)

    if(!parsed.success){
        res.status(400).json({error : parsed.error.issues[0]?.message ?? "invalid input"})
    }


    const {email  , password} = parsed.data;


    const existing = await prisma.user.findUnique({
        where : {email}
    })

    if (!existing) {
        res.status(409).json({error : "An account with this email is already there"})
        return;
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({data  :  {email, passwordHash}})
    

    const token  = signAuthToken({sub:  user.id , email : user.email})

    res.status(201).json({token, user : {id : user.id , email: user.email}})



}