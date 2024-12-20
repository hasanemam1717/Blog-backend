import { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../utils/sendResponse";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body)
    const _id = result?._id
    const name = result?.name
    const email = result?.email
    const data = { _id, name, email }

    sendResponse(res, {
        statusCode: (httpStatus.CREATED), success: true, message: "User is created.",
        data: data
    })
})

const logIn = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.logIn(req.body)
    sendResponse(res, {
        statusCode: (httpStatus.CREATED), success: true, message: "Login successful.",
        token: result?.accessToken,
        data: result
    })
})


export const authController = {
    register,
    logIn,

}