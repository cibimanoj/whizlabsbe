import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, 'Please provide task'],
      maxlength: 30,

    },
    taskDescription: {
      type: String,
      required: [true, 'Please  provide description'],
      maxlength: 500,
    },
    assignedTo: {
      type: String,
      required: [true, 'Please provide Assignee'],
      maxLength:20
    },

    startDate: {
      type: String,
      required: [true, 'Please provide start-date'],
    },
    endDate: {
        type: String,
        required: [true, 'Please provide end-date'],
      },
      dueDate: {
        type: String,
        required: [true, 'Please provide due-date'],
      },
       createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
       required: [true, 'Please provide user'],
       },
  },
)

export default mongoose.model('Task', TaskSchema)
