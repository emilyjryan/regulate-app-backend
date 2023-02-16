import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config()

import Task from "./models/Task";

// import db from "./models";

const port = 8000;

const app: Express = express();

app.use(cors());
app.use(express.json())

// GET route for home:
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from the backend 👋🏼");
})

// GET all tasks (schedule):

app.get("/tasks", async (req: Request, res: Response) => {
    const tasks = await Task.find({})
    res.json(tasks)
})

// POST a new task:
app.post("/tasks/new", async (req: Request, res: Response) => {
   const newTask = new Task({
        title: req.body.title,
        timeOfDay: req.body.timeOfDay,
        specificTime: req.body.specificTime,
   });
   const createdTask = await newTask.save()
   res.json(createdTask)
})

app.delete("/tasks/:taskId", async (req: Request, res: Response) => {
    const taskId = req.params.taskId
    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.json(deletedTask)
})

app.put("/tasks/complete/:taskId", async (req: Request, res: Response) => {
    const taskId = req.params.taskId
    const completedTask = await Task.findByIdAndUpdate({_id: taskId}, {completed: true})
    res.json(completedTask)
})

app.put("/tasks/undocomplete/:taskId", async (req: Request, res: Response) => {
    const taskId = req.params.taskId
    const undoCompletedTask = await Task.findByIdAndUpdate({_id: taskId}, {completed: false})
    res.json(undoCompletedTask)
})

const dbName = 'regulate-app'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/' + dbName

mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => {
        console.log(`Hearing the harmonious sounds of port ${port}`)
    });
    
})
const db = mongoose.connection
db.once('open', () => {
    console.log(MONGODB_URI)
    console.log(`:link: Connected to MongoDB at ${db.host}:${db.port}`);
  });
db.on('error',  err => {
    console.error(`:fire: Datacenter burned down:\n${err}`);
});
