import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
	cors({
		origin: "*",
		methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
		credentials: true,
	})
);

app.use("/auth", userRouter);

export default app;
