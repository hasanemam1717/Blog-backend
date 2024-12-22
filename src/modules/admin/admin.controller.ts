/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { AdminServices } from "./admin.service";
import sendResponse from "../utils/sendResponse";

const blockUser = catchAsync(async (req, res) => {
    // console.log(req.params.userId);
    const result = await AdminServices.blockUserFromDB(req.params.userId);

    sendResponse(res, {
        data: result,
        statusCode: httpStatus.CREATED,
        success: true,
        message: "This blog is blocked successfully",
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const result = await AdminServices.deleteBlogFromDB(req.params.id);

    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog deleted successfully",
    });
});

export const AdminControllers = {
    blockUser,
    deleteBlog,
};