import { Router } from "express";
import { createAddress, getUserAddresses, updateAddress, deleteAddress } from "../controllers/address.controller.js";
import { verifyToken } from "../utils/token-handler.js";
import { isUser } from "../utils/middleware.js";

const addressRouter = new Router();

addressRouter.post('/', [verifyToken, isUser], createAddress);

// Get all addresses for a user
addressRouter.get('/user-address/:userId', getUserAddresses);

// Update an address
addressRouter.patch('/update-address/:addressId', updateAddress);

// Delete an address
addressRouter.delete('/:addressId', deleteAddress);

export default addressRouter;