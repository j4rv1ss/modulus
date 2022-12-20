import express from "express";
import cors from "cors"

import route from "./routes/route.js"
import errorHandler from "./middleware/errorHandler.js"

import cookieParser from "cookie-parser"
export const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.use("/", route);
app.use(errorHandler);