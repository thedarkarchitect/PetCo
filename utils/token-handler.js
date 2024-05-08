import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import Jwt from "jsonwebtoken";

const createJWTtoken = (data) => {
    //generated the JWT token using crypto 
    return Jwt.sign(data, process.env.JWT_SECRET_ACCESS, { expiresIn: "48h"});
}

const verifyToken = (req, res, next) => {
    if(req.headers.authorization) {
        let authHeader = req.headers.authorization;
        let token = authHeader.split(" ")[1];

        if(token) {
            Jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, decode) => {
                if(err) {
                    res.status(StatusCodes.FORBIDDEN).send("Invalid Token Provided");
                } else {
                    req.tokenData = decode;
                    next();
                }
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST).send("Missing Authorization Header");
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send("Missing Authorization Header");
    }
}

export { createJWTtoken, verifyToken };
