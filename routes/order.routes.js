import { Router } from "express";
import { createOrder, deleteOrder, getOrderById, getUserOrders, updateOrder } from "../controllers/order.controller.js";

const orderRouter = new Router();

orderRouter.post("/createOrder", createOrder);

orderRouter.get("/get-users-order/:userId", getUserOrders);

orderRouter.get("/get-order/:orderId", getOrderById);

orderRouter.patch("/:orderId", updateOrder)

orderRouter.delete("/:orderId", deleteOrder);


export default orderRouter;