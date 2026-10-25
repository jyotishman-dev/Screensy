import cors from "cors"

import express , {type Express} from "express"
import { authRouter } from "./routes/auth.routes"

import {configDotenv} from "dotenv"
import { wallpapersRouter } from "./routes/wallpaper.routes";
import { recordingRouter } from "./routes/recording.routes";

configDotenv();

export const app : Express = express()

app.use(cors())

app.use(express.json())

app.get("/health", (_req , res) => {
    res.json({
        ok : true
    })
})

app.use("/api/v1",authRouter)
//  app.use("/api/v1/recordings", recordingRouter);
app.use("/api/v1/wallpapers", wallpapersRouter);
