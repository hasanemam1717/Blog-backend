import httpStatus from "http-status";
import { BlogModel } from "../blog/blog.model";
import { UserModel } from "../user/user.model";
import AppError from "../../app/errors/AppError";

const blockUserFromDB = async (id: string) => {
    const user = await UserModel.findById(id);
    // console.log(user);

    if (!user) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "The user you are trying to block, does not exist"
        );
    }

    const result = await UserModel.findByIdAndUpdate(id, { isBlocked: true });
    return result;
};

const deleteBlogFromDB = async (id: string) => {
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "The blog you are trying to delete, does not exist"
        );
    }

    // Allows a logged-in user to delete their own blog by its ID.
    const result = await BlogModel.findByIdAndDelete(id);

    return result;
};

export const AdminServices = {
    blockUserFromDB,
    deleteBlogFromDB,
};