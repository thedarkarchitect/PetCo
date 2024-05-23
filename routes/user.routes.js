import { Router } from "express";
import {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	loginUser,
	updateUser,
} from "../controllers/user.controller.js";
import { userSchema, validate } from "../utils/data-validator.js";
import { isAdmin } from "../utils/middleware.js";
import { verifyToken } from "../utils/token-handler.js";

const userRouter = Router();

userRouter.get("/", [verifyToken, isAdmin], getUsers);

userRouter.get("/:id", [verifyToken, isAdmin], getUserById);

userRouter.post("/login", loginUser);

userRouter.post("/signUp", validate(userSchema), createUser);

userRouter.patch("/:id", [verifyToken, isAdmin], updateUser);

userRouter.delete("/:id", [verifyToken, isAdmin], deleteUser);

export default userRouter;
