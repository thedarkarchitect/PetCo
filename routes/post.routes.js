import { Router } from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.controller.js";


const postRouter = Router();

postRouter.get("/", getPosts);

postRouter.get("/:id", getPostById);

postRouter.post("/createPost", createPost);

postRouter.patch("/:id", updatePost);

postRouter.delete("/:id", deletePost);

export default postRouter;
