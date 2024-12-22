import { Router } from "express";
import { USER_ROLE } from "../user/user.constant";
import { AdminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";


const router = Router();
// block a user
router.patch(
    "/admin/users/:userId/block",
    auth(USER_ROLE.admin),
    AdminControllers.blockUser
);

// delete a blog
router.delete("/admin/blogs/:id", auth(USER_ROLE.admin), AdminControllers.deleteBlog);

export const AdminRoutes = router;