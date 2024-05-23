import { Router } from "express";
import { createAddress, getUserAddresses, updateAddress, deleteAddress } from "../controllers/address.controller.js";


const addressRouter = new Router();

addressRouter.post('/', createAddress);

// Get all addresses for a user
addressRouter.get('/user-address/:userId', getUserAddresses);

// Update an address
addressRouter.patch('/update-address/:addressId', updateAddress);  //permission to be set

// Delete an address
addressRouter.delete('/delete-address/:addressId', deleteAddress);

export default addressRouter;