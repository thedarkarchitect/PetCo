import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const homeRouter = new Router();

homeRouter.get("/", (req, res) => {
    try{
        res.status(StatusCodes.OK).json({message: "Welcome to the PetCo Api!"});
    } catch(error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error
        })
    }
    
  });

export default homeRouter;