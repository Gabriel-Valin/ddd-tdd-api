import express from "express"
import cors from "cors"
import { contactRouter } from "@/Main/Route/Contact"
import { internalServerMiddleware } from "@/Main/Middleware/ErrorHandling"

export const app = express()

app.use(express.json())
app.use(cors())
app.use(contactRouter)
app.use(internalServerMiddleware)
