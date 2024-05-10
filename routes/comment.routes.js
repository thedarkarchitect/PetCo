import { Router } from "express";
import { createComment, deleteComment, getAllCommentsForPost } from "../controllers/comment.controller.js";

const commentRouter = Router();


commentRouter.get("/:postId", getAllCommentsForPost);

commentRouter.post("/createComment", createComment);

commentRouter.delete("/:id", deleteComment);

export default commentRouter;