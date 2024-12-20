import mongoose from "mongoose";


export interface TBlog {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    isPublished: boolean;
}
