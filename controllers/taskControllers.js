import Task from "../models/Task.js"
import mongoose from "mongoose"
const createTask = async(req,res) =>{

    const {taskName,taskDescription,startDate,endDate,dueDate,assignedTo} = req.body;
    if(!taskName ||!taskDescription ||!startDate ||!endDate||!assignedTo||!dueDate){
       return res.status(400).json({msg:"Please provide all the fields"})
    }
    console.log(req.user)
     req.body.createdBy = req.user.userId
    const tasks = await Task.create(req.body)
   return res.status(200).json({tasks})

}
const getTasks = async (req,res)=>{
    const tasks= await Task.find()
    console.log(tasks)
    return res.status(200).json({tasks})
}
const deleteTasks = async (req,res)=>{
    const {id:taskId} = req.params;
    console.log(taskId)
    const task = await Task.findOne({_id:mongoose.Types.ObjectId(taskId)})
    if(!task){
      return  res.status(400).json({msg:"No tasks found in such id"})
    }
    await task.remove()
    return res.status(200).json({msg:"Task removed successfully"})
}
const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    const tasks = await Task.findOne({ _id: taskId });
  
    if (!tasks) {
      return res.status(400).json({msg:"Task not found"})
    }
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body);
    console.log(updatedTask)
    res.status(200).json({ updatedTask});
  };
export {createTask,getTasks,deleteTasks,updateTask} 