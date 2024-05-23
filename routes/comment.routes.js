import { Router } from "express";
import { createComment, deleteComment, getAllCommentsForPost } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/token-handler.js";
import { isAdmin, isUser } from "../utils/middleware.js";

const commentRouter = Router();


commentRouter.get("/post-comments/:postId", verifyToken, getAllCommentsForPost);

commentRouter.post("/createComment", [verifyToken, isUser], createComment);

commentRouter.delete("/delete-post-comment/:id", [verifyToken, isAdmin], deleteComment);

export default commentRouter;