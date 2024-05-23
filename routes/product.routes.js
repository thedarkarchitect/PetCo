import { Router } from "express";
import { createProduct, deleteProduct, getAllproducts, getProductById, searchProducts, updateProduct } from "../controllers/products.controller.js";

const productRouter = Router();

productRouter.get("/", getAllproducts);

productRouter.get("/:id", getProductById);

productRouter.get("/search", searchProducts)

productRouter.post("/createProduct", createProduct);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
