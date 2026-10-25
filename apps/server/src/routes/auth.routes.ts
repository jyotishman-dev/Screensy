import { Router } from "express";
import { getMe, LoginController, LogoutController, SignupController } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth";



export const authRouter : Router = Router();


authRouter.post("/signup", SignupController);
authRouter.post('/login', LoginController)

authRouter.post("/logout", LogoutController)
authRouter.get("/me", requireAuth, getMe)


