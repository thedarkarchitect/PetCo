import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import addressRouter from "./routes/address.routes.js";
import petRouter from "./routes/pet.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";

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

app.use("/api/auth", userRouter); // done secured
app.use("/api/posts", postRouter); // done
app.use("/api/comments", commentRouter); // done
app.use("/api/products", productRouter); //done
app.use("/api/orders", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/address", addressRouter); //done
app.use("/api/pet", petRouter);
app.use("/api/appointments", appointmentRouter)

export default app;
