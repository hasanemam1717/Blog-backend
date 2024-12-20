import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const blogRouter = Router();

blogRouter.post('/blogs', auth(USER_ROLE.admin), blogController.createBlog)
blogRouter.get('/blogs', auth(USER_ROLE.admin), blogController.getAllBlogs)
blogRouter.get('/blogs/:id', auth(USER_ROLE.admin), blogController.getSingleBlog)

export default blogRouter;