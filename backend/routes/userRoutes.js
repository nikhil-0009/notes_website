import express from "express"
import { userLogin, userSignUp } from "../controller/userController.js"

const userRoutes=express.Router()

userRoutes.post("/login",userLogin)
userRoutes.post("/signup",userSignUp)

export default userRoutes