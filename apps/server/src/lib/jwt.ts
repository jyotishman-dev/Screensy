import jwt from "jsonwebtoken"


export interface  AuthTokenPayload  {
    sub : string;
    email  : string
}


const  JWT_EXPIRES_IN ="7d"

function getSecret():  string {
    const secret = process.env.JWT_SECRET;

    if(!secret){
        throw new Error("Jwt secret is missing")
    }

    return secret
}


export function signAuthToken(payload : AuthTokenPayload) : string {
    return jwt.sign(payload , getSecret(), {expiresIn : JWT_EXPIRES_IN})


}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, getSecret()) as AuthTokenPayload;
}

  