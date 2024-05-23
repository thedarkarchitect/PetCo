import { Router } from "express";
import { addToWishList, deleteWishlist, deleteWishlistItem, getUserWishlist } from "../controllers/wishList.controller.js";
import { isUser, isAdmin } from "../utils/middleware.js";
import { verifyToken } from "../utils/token-handler.js";

const wishlistRouter = new Router();

wishlistRouter.post("/add-to-wishList/", [verifyToken, isUser], addToWishList);

wishlistRouter.get("/get-user-wishlist/:userId", verifyToken, getUserWishlist); //

wishlistRouter.delete("/delete-user-wishlist/:userId", verifyToken, deleteWishlist);//

wishlistRouter.delete("/delete-wishlist-item/:wishListId", [verifyToken, isUser], deleteWishlistItem);

export default wishlistRouter;