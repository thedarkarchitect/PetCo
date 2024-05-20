import { Router } from "express";
import { createPet, deletePet, getOwnerPets, getPetById, getPets, updatePet } from "../controllers/pet.controller.js";
import { verifyToken } from "../utils/token-handler.js";
import { isAdmin } from "../utils/middleware.js";

const petRouter = new Router();

petRouter.get("/:petId", [verifyToken, isAdmin], getPetById);
petRouter.get("/", [verifyToken, isAdmin], getPets);
petRouter.get("/owner-pet/:ownerId", [verifyToken, isAdmin], getOwnerPets);

petRouter.post("/create-pet", verifyToken, createPet);

petRouter.patch("/update-pet/:petId", [verifyToken, isAdmin], updatePet);
petRouter.delete("/delete-pet/:petId", [verifyToken, isAdmin], deletePet);

export default petRouter;