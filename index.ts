import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

import Task from "./models/Task";

// import db from "./models";

const port = 8000;

const app: Express = express();

// GET route for home:
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from the backend 👋🏼");
})

// POST a new task:
app.post("/tasks", async (req: Request, res: Response) => {
    // try {
    //     const newTask = await debugger.
    // }
    // res.send("Hey there 👋🏼");
})

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/regulate-app`).then(() => {
    app.listen(port, () => {
        console.log(`Hearing the harmonious sounds of port ${port}`)
    });
    
})
const db = mongoose.connection
db.once('open', () => {
    console.log(`:link: Connected to MongoDB at ${db.host}:${db.port}`);
  });
db.on('error',  err => {
    console.error(`:fire: Datacenter burned down:\n${err}`);
});
