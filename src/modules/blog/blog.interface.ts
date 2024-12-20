import { Types } from 'mongoose'; // Import Types for ObjectId

export interface TBlog {
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished: boolean;
}
