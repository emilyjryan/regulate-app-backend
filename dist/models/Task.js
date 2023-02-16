"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// const ObjectId = mongoose.Types.ObjectId;
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    timeOfDay: {
        type: String,
        required: true
    },
    specificTime: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const TaskModel = mongoose_1.default.model('Task', TaskSchema);
exports.default = TaskModel;
