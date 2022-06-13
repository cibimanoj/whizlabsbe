import express from "express"
const router = express.Router()
import {createTask,getTasks,deleteTasks,updateTask} from "../controllers/taskControllers.js"


router.route('/').post(createTask).get(getTasks)
router.route('/:id').delete(deleteTasks).patch(updateTask)



export default router