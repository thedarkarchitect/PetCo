import { Router } from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.controller.js";
// import { postSchema, validate } from "../utils/data-validator.js";
import { verifyToken } from "../utils/token-handler.js";
import { isAdmin } from "../utils/middleware.js";

const postRouter = Router();

postRouter.get("/", verifyToken, getPosts);
postRouter.get("/:id", verifyToken, getPostById);

postRouter.post("/createPost", createPost);

postRouter.patch("/:id", [verifyToken, isAdmin], updatePost);
postRouter.delete("/:id", [verifyToken, isAdmin], deletePost);

export default postRouter;
