import { Router } from "express";
import { addToWishList, deleteWishlist, deleteWishlistItem, getUserWishlist } from "../controllers/wishList.controller.js";
import { isUser, isAdmin } from "../utils/middleware.js";
import { verifyToken } from "../utils/token-handler.js";

const wishlistRouter = new Router();

wishlistRouter.post("/add-to-wishList/", addToWishList);

wishlistRouter.get("/get-user-wishlist/:userId", getUserWishlist); //

wishlistRouter.delete("/delete-user-wishlist/:userId", deleteWishlist);//

wishlistRouter.delete("/delete-wishlist-item/:wishListId", deleteWishlistItem);

export default wishlistRouter;