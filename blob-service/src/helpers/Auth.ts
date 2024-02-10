import { Request, Response, NextFunction } from "express";
import envVars from "./EnvConfig";
import { ErrorResponse } from "./Response";
import { verify } from "jsonwebtoken";

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const { headers } = request;
        const apiToken = headers['authorization']
        console.log(apiToken)
        if (apiToken) {
            const barerToken = apiToken.split(" ")[1]
            const isVerifiedToken = verify(barerToken, envVars.SECRET);
            try {
                if (isVerifiedToken) {
                    next();
                } else {
                    throw new ErrorResponse(401, "Wrong authentication token", []);
                }
            } catch (error) {
                throw new ErrorResponse(401, "Wrong authentication token", []);
            }
        } else {
            throw new ErrorResponse(401, "Unauthorized", []);
        } 
    } catch (error) {
        next(error)
    }
    
}

export default authMiddleware;