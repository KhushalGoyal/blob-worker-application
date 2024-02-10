import { body } from "express-validator"

export function createWorkerJobValidator() {
    return [
        body("blobId").exists().withMessage("Blob uuid is required!"),
        body("payloadLocation").exists().withMessage("Blob Location is required!"),
        body("payloadSize").isNumeric().withMessage("Blob Size should be numberic!").exists().withMessage("Blob Size is required!"),
    ]
}
