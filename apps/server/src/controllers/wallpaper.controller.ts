
import prisma  from "@screensy/db";
import type  { Request, Response } from "express";

export const getWallpapers = async (_req: Request, res: Response) => {
  const wallpapers = await prisma.wallpaper.findMany({
    where: { isDefault: true },
    orderBy: { createdAt: "asc" },
  });

  res.status(200).json({ wallpapers });
};

export const createWallpaper = async (_req: Request, res: Response) => {
  res.status(501).json({
    error: "Custom wallpaper upload isn't available yet",
  });
};

export const deleteWallpaper = async (_req: Request, res: Response) => {
  res.status(501).json({
    error: "Custom wallpaper upload isn't available yet",
  });
};
