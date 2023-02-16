import mongoose from "mongoose";

const Schema = mongoose.Schema

// const ObjectId = mongoose.Types.ObjectId;

const TaskSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    details: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const TaskModel = mongoose.model('Task', TaskSchema)

export default TaskModel;