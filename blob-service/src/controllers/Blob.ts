import { Request, Response, NextFunction } from "express";
import { ErrorResponse, SuccessResponse } from "../helpers/Response";
import { QueryObject, BlobContent } from "../entities/Entities";
import BlobService from "../services/Blob";
import fs from "fs";
import path from "path";

class Blob {
    public static get(request: Request, response: Response, next: NextFunction) {
        const blobService = new BlobService();
        const { id } = request.params as QueryObject;
        blobService.get(id).then((result) => {
            response.writeHead(200, {
                'Content-Type': result.blobType,
                'Content-Length': result.blobSize,
                'content-disposition': 'attachment; filename=' + result.blobOriginalName
            });
            const filePath = path.join(__dirname, "../uploads/", result.blobFileName as string)
            fs.createReadStream(filePath).pipe(response).on("error", (err) => {
                const error = new ErrorResponse(400, err?.message, [])
                next(error)
            })
        }).catch((err) => {
            console.log(err)
            const error = new ErrorResponse(err?.response?.status, err?.message, [])
            next(error)
        })
    }

    public static post(request: Request, response: Response, next: NextFunction) {
        const blobService = new BlobService();
        if (!request.file) {
            throw new ErrorResponse(400, "Blob is required!", [])
        }
        const blobData: Omit<BlobContent, "uuid"> = {
            blobLocation: request.file?.path as string,
            blobSize: request.file?.size,
            blobType: request.file?.mimetype,
            blobOriginalName: request.file?.originalname,
            blobFileName: request.file?.filename,
        }
        blobService.addBlob(blobData).then((result) => {
            const successResponse = new SuccessResponse(200, "Blob Created Successfully!", result)
            response.status(successResponse.status).send(successResponse)
        }).catch((err) => {
            console.log(err)
            const error = new ErrorResponse(err?.response?.status, err?.message, [])
            next(error)
        })
    }
}

export default Blob;