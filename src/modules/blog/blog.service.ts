
import { JwtPayload } from "jsonwebtoken";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import { UserModel } from "../user/user.model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";


const createBlog = async (decodedUser: JwtPayload, payload: TBlog) => {
    const { email } = decodedUser;

    const author = await UserModel.findOne({ email });

    if (!author) {
        throw new AppError(httpStatus.NOT_FOUND, "Author not found");
    }

    const authorId = author?._id;

    payload.author = authorId;

    const result = await BlogModel.create(payload);
    return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
    const queryObj = { ...query };
    let search = '';   // SET DEFAULT VALUE 

    // IF searchTerm  IS GIVEN SET IT
    if (query?.search) {
        search = query?.search as string;
    }

    const searchableFields = [
        'title',
        'content'
    ];

    // WE ARE DYNAMICALLY DOING IT USING LOOP
    const searchQuery = BlogModel.find({
        $or: searchableFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
        })),
    });
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);


    // console.log(queryObj.filter);
    // const id = queryObj?.filter


    // const filterQuery = searchQuery
    //     .find({ _id: id })

    let sortBy = 'createdAt';
    if (query?.sortBy) {
        sortBy = query.sortBy as string
    }
    const order = query?.sortOrder === 'desc' ? -1 : 1;


    const sortQuery = await searchQuery.sort({ [sortBy]: order });

    return sortQuery;
};

const getSingleBlogs = async (id: string) => {


    const result = await BlogModel.findById(id)
    return result;
};

const updateBlog = async (
    decodedUser: JwtPayload,
    id: string,
    payload: Partial<TBlog>
) => {
    // the blog to be updated
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "The blog you are trying to update, does not exist"
        );
    }

    // check if the id found in decoded user matches with the id to be edited
    const user = await UserModel.findOne({ email: decodedUser.email });
    const userId = user?._id;

    // Allows a logged-in user to update their own blog by its ID.

    const authorId = blog.author;

    const matchedUserAndAuthor = userId?.equals(authorId);

    if (!matchedUserAndAuthor) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "You are trying to update another user blog"
        );
    }

    const result = await BlogModel.findByIdAndUpdate(id, payload, {
        new: true,
    });

    return result;
};



const deleteBlog = async (decodedUser: JwtPayload, id: string) => {
    // the blog to be deleted
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "The blog you are trying to delete, does not exist"
        );
    }

    // check if the id found in decoded user matches with the id to be deleted
    const user = await UserModel.findOne({ email: decodedUser.email });
    const userId = user?._id;

    // if the role is user, check if the right user is deleting their blog

    const authorId = blog.author;

    const matchedUserAndAuthor = userId?.equals(authorId);

    if (!matchedUserAndAuthor) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "You are trying to delete another user's blog"
        );
    }
}
export const blogService = {
    createBlog,
    getAllBlogs,
    getSingleBlogs,
    deleteBlog,
    updateBlog

}