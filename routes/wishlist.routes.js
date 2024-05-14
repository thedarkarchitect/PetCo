import { Router } from "express";
import { addToWishList, deleteWishlist, deleteWishlistItem, getUserWishlist } from "../controllers/wishList.controller.js";

const wishlistRouter = new Router();

wishlistRouter.post("/", addToWishList);

wishlistRouter.get("/:userId", getUserWishlist);

wishlistRouter.delete("/:userId", deleteWishlist);

wishlistRouter.delete("/delete-item/:wishListId", deleteWishlistItem);

export default wishlistRouter;