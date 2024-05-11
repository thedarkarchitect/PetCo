import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import productRouter from "./routes/product.routes.js";

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

app.use("/api/auth", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/products", productRouter);

export default app;
