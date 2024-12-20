
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";


const createBlog = async (payload: TBlog) => {
    const result = await BlogModel.create(payload)
    return result;
}

const getAllBlogs = async (query: Record<string, unknown>) => {
    const result = await BlogModel.find()
    //   .search(CourseSearchableFields)
    //   .filter()
    //   .sort()
    //   .paginate()
    //   .fields();

    // const result = await courseQuery.modelQuery;
    return result;
};

const getSingleBlogs = async (id: string) => {
    const result = await BlogModel.findById(id)
    return result;
};

export const blogService = {
    createBlog,
    getAllBlogs,
    getSingleBlogs
}