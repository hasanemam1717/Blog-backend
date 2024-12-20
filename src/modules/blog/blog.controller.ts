import { Request, Response } from "express";
import { blogService } from "./blog.service";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

const createBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await blogService.createBlog(req.body)


    sendResponse(res, { statusCode: (httpStatus.CREATED), success: true, message: "Blog created successfully.", data: result })
})

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await blogService.getAllBlogs(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs are retrieved successfully.',
        data: result,
    });
});

const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogService.getSingleBlogs(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is retrieved successfully',
        data: result,
    });
});

export const blogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog
}