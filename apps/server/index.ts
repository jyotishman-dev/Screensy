import cors from "cors"

import express , {type Express} from "express"



export const app : Express = express()


app.use(cors())


app.use(express.json())

app.get("/health", (_req , res) => {
    res.json({
        ok : true
    })
})


app.use("/api/v1/wallpapers" , )

app.use("/api/v1/try")
