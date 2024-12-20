import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

// Define the BlogPost schema
const blogSchema = new Schema<TBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export const BlogModel = model<TBlog>('BlogPost', blogSchema);


