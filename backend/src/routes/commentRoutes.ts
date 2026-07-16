import { Router } from "express";
import * as commentController from "../controllers/commentController";


const router = Router();

router.post("/:productId",commentController.createComment);

router.delete("/:commentId", commentController.deleteComment);


export default router;