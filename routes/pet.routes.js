import { Router } from "express";
import { createPet, deletePet, getOwnerPets, getPetById, getPets, updatePet } from "../controllers/pet.controller.js";

const petRouter = new Router();

petRouter.get("/get-pet/:petId", getPetById);//done

petRouter.get("/", getPets);//done

petRouter.get("/get-owner-pet/:ownerId", getOwnerPets);

petRouter.post("/create-pet", createPet);

petRouter.patch("/update-pet/:petId", updatePet);

petRouter.delete("/delete-pet/:petId", deletePet);

export default petRouter;