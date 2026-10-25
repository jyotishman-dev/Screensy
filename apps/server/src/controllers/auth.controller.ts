import { loginSchema, signupSchema } from "@screensy/common"
import type {Request, Response} from "express"
import prisma from "@screensy/db"
import { hashPassword, verifyPassword } from "../lib/passwordHash"
import { signAuthToken } from "../lib/jwt"



export const  SignupController =async(req : Request , res : Response) =>{

    const parsed = signupSchema.safeParse(req.body)

    if(!parsed.success){
       return  res.status(400).json({error : parsed.error.issues[0]?.message ?? "invalid input"})
    }


    const {email  , password} = parsed.data;


    const existing = await prisma.user.findUnique({
        where : {email}
    })

    if (existing) {
        return res.status(409).json({error : "An account with this email is already there"})
       
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({data  :  {email, passwordHash}})
    

    const token  = signAuthToken({sub:  user.id , email : user.email})

    res.status(201).json({token, user : {id : user.id , email: user.email}})



}

export const   LoginController = async (req : Request , res : Response) =>{
    const parsed = loginSchema.safeParse(req.body);

    if(!parsed.success) {
        return res.status(400).json({error : parsed.error.issues[0]?.message ?? "invalid input"})
    }


    const {email , password} = parsed.data;


    const user =  await prisma.user.findUnique({where : {email}})

    if(!user){
        res.status(401).json({error : "User not  found please sign in"})
        return
    }  

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
    }

    const token = await signAuthToken({sub : user.id , email : user.email});

    res.status(200).json({token , user : {id : user.id , email : user.email}});

}



export const LogoutController = async (req : Request , res : Response) => {
    res.status(200).json({message  : "Logged Out"})
}


export const getMe = async (req : Request , res : Response) => {

    const user = await prisma.user.findUnique({where : {id : req.user!.id}})

 if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

    res.status(200).json({user : {id : user.id , email : user.email}})

}