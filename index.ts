import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

import Task from "./models/Task";

// import db from "./models";

const port = 8000;

const app: Express = express();

app.use(express.json())

// GET route for home:
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from the backend 👋🏼");
})

// POST a new task:
app.post("/tasks/new", async (req: Request, res: Response) => {
   const newTask = new Task({
        title: 'Brush my teeth for 2 minutes',
        time: 'morning',
        details: 'Brush your teeth after breakfast and before your next activity'
   });
   const createdTask = await newTask.save()
   res.json(createdTask)
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
