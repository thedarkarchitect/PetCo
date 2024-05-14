import { Router } from "express";
import { createPet, deletePet, getOwnerPets, getPetById, getPets, updatePet } from "../controllers/pet.controller.js";

const petRouter = new Router();

petRouter.get("/:petId", getPetById);
petRouter.get("/", getPets);
petRouter.get("/:ownerId", getOwnerPets);

petRouter.post("/create-pet", createPet);

petRouter.patch("/:petId", updatePet);
petRouter.delete("/:petId", deletePet);

export default petRouter;