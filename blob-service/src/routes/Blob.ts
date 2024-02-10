import { Router } from "express";
import Blob from "../controllers/Blob";
import { upload } from "../helpers/FileUpload";

const router = Router();
router.get('/:id', Blob.get)
router.post('/', upload.single("file"), Blob.post)

export default router;