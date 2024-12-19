import { Router } from "express";
import { authController } from "./auth.controller";


const authRoute = Router()

authRoute.post('/register', authController.register)
authRoute.post('/login', authController.logIn)


export default authRoute;