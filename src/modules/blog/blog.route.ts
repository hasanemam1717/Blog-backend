import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { blogUpdateValidationSchema, } from "./blog.validation";
import validateRequest from "../../middlewares/validateRequest";


const blogRouter = Router();

blogRouter.post('/blogs', auth(USER_ROLE.user), blogController.createBlog)
blogRouter.get('/blogs', blogController.getAllBlogs)
blogRouter.get('/blogs/:id', blogController.getSingleBlog)
blogRouter.patch('/blogs/:id', auth(USER_ROLE.user), validateRequest(blogUpdateValidationSchema), blogController.updateBlog)
blogRouter.delete('/blogs/:id', auth(USER_ROLE.user), blogController.deleteBlog)

export default blogRouter;