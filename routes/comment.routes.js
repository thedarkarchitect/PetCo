import { Router } from "express";
import { createComment, deleteComment, getAllCommentsForPost } from "../controllers/comment.controller.js";


const commentRouter = Router();


commentRouter.get("/post-comments/:postId", getAllCommentsForPost);

commentRouter.post("/createComment", createComment);

commentRouter.delete("/delete-post-comment/:id", deleteComment);

export default commentRouter;