
import { Router } from "express";
import { createWallpaper, deleteWallpaper, getWallpapers } from "../controllers/wallpaper.controller";


export const wallpapersRouter: Router = Router();


wallpapersRouter.get("/", getWallpapers);


wallpapersRouter.post("/", createWallpaper);


wallpapersRouter.delete("/:id", deleteWallpaper);
