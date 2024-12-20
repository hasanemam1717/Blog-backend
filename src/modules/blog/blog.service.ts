
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";


const createBlog = async (payload: TBlog) => {
    const result = await BlogModel.create(payload)
    return result;
}

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



const updateBlog = async (id: string, payload: TBlog) => {
    const result = await BlogModel.findOneAndUpdate({ _id: id }, payload, { new: true })
    return result
}

const deleteBlog = async (id: string) => {
    const result = await BlogModel.findByIdAndDelete(
        id
    );
    return result;
};
export const blogService = {
    createBlog,
    getAllBlogs,
    getSingleBlogs,
    deleteBlog,
    updateBlog

}