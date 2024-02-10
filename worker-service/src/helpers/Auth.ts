import { Request, Response, NextFunction } from "express";
import envVars from "./EnvConfig";
import { ErrorResponse } from "./Response";
import { verify } from "jsonwebtoken";
import { User } from "../entities/Entities";

declare global {
    namespace Express {
      interface Request {
        user?: User
      }
    }
  }
async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const { headers } = request;
        const apiToken = headers['authorization']
        if (apiToken) {
            const barerToken = apiToken.split(" ")[1]
            const isVerifiedToken = verify(barerToken, envVars.SECRET) as {
                tid: string,
                oid: string,
                email: string,
            };
            request.user = {
                tenentId: isVerifiedToken?.tid,
                clientId: isVerifiedToken?.oid,
                email: isVerifiedToken?.email,
            };
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