import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

// Define the BlogPost schema
const blogSchema = new Schema<TBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'Author field is required.'],
        ref: 'User'
    },
    isPublished: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export const BlogModel = model<TBlog>('BlogPost', blogSchema);


