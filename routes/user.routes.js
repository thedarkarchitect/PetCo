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

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/login", loginUser);

userRouter.post("/signUp", validate(userSchema), createUser);

userRouter.patch("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
