
import { Router } from "express";
import { createWallpaper, deleteWallpaper, getWallpapers } from "../controllers/wallpaper.controller";


export const wallpapersRouter: Router = Router();

// GET /api/v1/wallpapers
wallpapersRouter.get("/", getWallpapers);

// POST /api/v1/wallpapers
wallpapersRouter.post("/", createWallpaper);

// DELETE /api/v1/wallpapers/:id
wallpapersRouter.delete("/:id", deleteWallpaper);
