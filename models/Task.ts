import mongoose from "mongoose";

const Schema = mongoose.Schema

// const ObjectId = mongoose.Types.ObjectId;

const TaskSchema = new Schema ({
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
    minutes: {
        type: Number,
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