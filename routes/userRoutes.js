import express from "express"
import authControl from "../middleware/auth.js"
const router = express.Router();
import { register,login,getUser,updateUser } from "../controllers/userControllers.js";


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/").get(authControl,getUser).patch(authControl,updateUser)


export default router

