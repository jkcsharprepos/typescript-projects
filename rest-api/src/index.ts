import express from "express";
import http from "http";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"

import {Config} from "../const/Config";
import router from "./router";

const PORT = 4000;
const MONGO_URL =`mongodb+srv://${Config.MONGO_USER}:${Config.MONGO_PASSWORD}@${Config.MONGO_CLUSTER}`;

const app = express();

app.use(cors({
    credentials:true,
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


// app.get("*",(req,res)=>{
//     res.send("This server works fine, but this site does not exist");
// })



app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("Error",(error:"Error")=>console.log("error"));

app.use("/", router());