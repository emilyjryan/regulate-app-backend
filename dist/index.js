"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const Task_1 = __importDefault(require("./models/Task"));
// import db from "./models";
const port = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// GET route for home:
app.get("/", (req, res) => {
    res.send("Hello from the backend 👋🏼");
});
// GET all tasks (schedule):
app.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find();
    console.log(tasks);
    res.json(tasks);
}));
// POST a new task:
app.post("/tasks/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = new Task_1.default({
        title: req.body.title,
        time: req.body.time,
        details: req.body.details,
    });
    const createdTask = yield newTask.save();
    res.json(createdTask);
}));
const dbName = 'regulate-app';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/' + dbName;
mongoose_1.default.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => {
        console.log(`Hearing the harmonious sounds of port ${port}`);
    });
});
const db = mongoose_1.default.connection;
db.once('open', () => {
    console.log(MONGODB_URI);
    console.log(`:link: Connected to MongoDB at ${db.host}:${db.port}`);
});
db.on('error', err => {
    console.error(`:fire: Datacenter burned down:\n${err}`);
});
