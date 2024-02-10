import { Router } from "express";
import Worker from "../controllers/Worker";
import { createWorkerJobValidator } from "../validator/Worker";

const router = Router();
router.get('/:id/status', Worker.get)
router.post('/', createWorkerJobValidator(), Worker.post)

export default router;