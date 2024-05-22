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
app.use(express.json({limit: "25mb"}));
app.use(morgan("dev"));
app.use(
	cors({
		origin: "*",
		methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
		credentials: true,
	})
);
app.use(express.urlencoded({limit: "25mb", extended: true}))

app.use("/api/v1/auth", userRouter); // done secured
app.use("/api/v1/posts", postRouter); // done
app.use("/api/v1/comments", commentRouter); //done
app.use("/api/v1/products", productRouter); 
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/wishlist", wishlistRouter); //done
app.use("/api/v1/address", addressRouter); //done
app.use("/api/v1/pet", petRouter);//done
app.use("/api/v1/appointments", appointmentRouter)// done

export default app;
