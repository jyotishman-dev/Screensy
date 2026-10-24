import bcrypt from "bcryptjs";


export async function hashPassword(password :  string) {
const hash  =await  bcrypt.hash(password, 10) 
return hash   
}


export async function verifyPassword(password: string, hashPassword : string){
    const hash = await bcrypt.compare(password , hashPassword)
    return hash
}