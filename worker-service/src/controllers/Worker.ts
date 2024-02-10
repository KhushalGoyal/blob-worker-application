import {Request, Response, NextFunction} from "express";
import WorkService from "../services/Worker";
import { ErrorResponse, SuccessResponse } from "../helpers/Response";
import { QueryObject, WorkerJob } from "../entities/Entities";
import { validationResult } from "express-validator";

class Worker {
    public static get(request: Request, response: Response, next: NextFunction) {
        const workService = new WorkService();
        const { id } = request.params as QueryObject;
        workService.get(id).then((result)=> {
            const successResponse = new SuccessResponse(200, "Job Details!", result)
            response.status(successResponse.status).send(successResponse)
        }).catch((err) => {
            console.log(err)
            const error = new ErrorResponse(err?.response?.status, err?.message, [])
            next(error)
        })
    }

    public static post(request: Request, response: Response, next: NextFunction) {
        const error = validationResult(request);
        if (!error.isEmpty()) {
            throw new ErrorResponse(400, "Validation error!", error as any);
        }
        const workService = new WorkService();
        const data = {...request.body as Omit<WorkerJob, "uuid">, ...request.user};
        workService.addJob(data).then((result)=> {
            const successResponse = new SuccessResponse(200, "Job Created Successfully!", result)
            response.status(successResponse.status).send(successResponse)
        }).catch((err) => {
            console.log(err)
            const error = new ErrorResponse(err?.response?.status, err?.message, [])
            next(error)
        })
    }   
}

export default Worker;