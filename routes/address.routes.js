import { Router } from "express";
import { createAddress, getUserAddresses, updateAddress, deleteAddress } from "../controllers/address.controller.js";

const addressRouter = new Router();

addressRouter.post('/', createAddress);

// Get all addresses for a user
addressRouter.get('/:userId', getUserAddresses);

// Update an address
addressRouter.patch('/:addressId', updateAddress);

// Delete an address
addressRouter.delete('/:addressId', deleteAddress);

export default addressRouter;