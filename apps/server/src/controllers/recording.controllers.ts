import { createRecordingSchema } from "@screensy/common";
import prisma from "@screensy/db";
import type { Request, Response } from "express";

const WALLPAPER_SUMMARY_SELECT = { id: true, name: true, url: true } as const;

export   const  getAllRecordings = async(req : Request, res :  Response) =>{
    const recordings  = await prisma.recording.findMany({
        where :{ownerId :  req.user!.id},
        orderBy  : {createdAt : "desc"},
        include : {wallpaper : {select : WALLPAPER_SUMMARY_SELECT}}

    });

    res.status(200).json({recordings})


}

export const createRecording =async(req : Request, res :  Response) =>{

    const parsed = await createRecordingSchema.safeParse(req.body)

    if(!parsed.success){
      return  res.status(400).json({error: parsed.error.issues[0]?.message ?? "Invalid Input"})
    }


    const {title, duration , wallpaperId } = parsed.data

    if(wallpaperId){
        const wallpaper = await prisma.wallpaper.findUnique({where : {id : wallpaperId}})
 
        if (!wallpaper) {
      res.status(400).json({ error: "Unknown wallpaperId" });
      return;
    }
 
    }

    const recording = await prisma.recording.create({
    data: { title, duration, wallpaperId, ownerId: req.user!.id },
  });

  res.status(201).json({ recording });

    
}


export const getRecordingById =async(req : Request, res :  Response) => {

    res.status(501).json({error : "GET recording by id not implemented"})
}


export const deleteRecording =async(req : Request, res :  Response) =>{
     const recording = await prisma.recording.findUnique({ where: { id: req.params.id } });
  if (!recording) {
    res.status(404).json({ error: "Recording not found" });
    return;
  }
  if (recording.ownerId !== req.user!.id) {
    res.status(403).json({ error: "You don't own this recording" });
    return;
  }

  await prisma.recording.delete({ where: { id: recording.id } });
  res.status(204).send();
}