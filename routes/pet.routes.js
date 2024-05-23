import { Router } from "express";
import { createPet, deletePet, getOwnerPets, getPetById, getPets, updatePet } from "../controllers/pet.controller.js";
import { verifyToken } from "../utils/token-handler.js";
import { isAdmin, isUser } from "../utils/middleware.js";

const petRouter = new Router();

petRouter.get("/get-pet/:petId", [verifyToken, isAdmin], getPetById);//done

petRouter.get("/", [verifyToken, isAdmin], getPets);//done

petRouter.get("/get-owner-pet/:ownerId", [verifyToken, isAdmin], getOwnerPets);

petRouter.post("/create-pet", [verifyToken, isUser], createPet);

petRouter.patch("/update-pet/:petId", [verifyToken, isAdmin], updatePet);

petRouter.delete("/delete-pet/:petId", [verifyToken, isAdmin], deletePet);

export default petRouter;