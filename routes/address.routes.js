import { Router } from "express";
import { createAddress, getUserAddresses, updateAddress, deleteAddress } from "../controllers/address.controller.js";
import { verifyToken } from "../utils/token-handler.js";
import { isUser, isAdmin } from "../utils/middleware.js";

const addressRouter = new Router();

addressRouter.post('/', [verifyToken, isUser], createAddress);

// Get all addresses for a user
addressRouter.get('/user-address/:userId', [verifyToken, isAdmin], getUserAddresses);

// Update an address
addressRouter.patch('/update-address/:addressId', [verifyToken, isUser], updateAddress);  //permission to be set

// Delete an address
addressRouter.delete('/delete-address/:addressId', [verifyToken, isAdmin], deleteAddress);

export default addressRouter;