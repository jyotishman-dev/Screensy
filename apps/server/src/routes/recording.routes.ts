import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createRecording, deleteRecording, getAllRecordings, getRecordingById } from "../controllers/recording.controllers";



export const  recordingRouter :  Router = Router();




recordingRouter.get('/', getAllRecordings)
recordingRouter.post('/',  requireAuth, createRecording)
recordingRouter.get('/:id', getRecordingById)

recordingRouter.delete("/:id", deleteRecording)

