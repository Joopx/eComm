import { Router } from "express";
import { syncUser } from "../controllers/userController";



const router = Router();


// /api/user/sync - POST =>sync clerk user to the db(PROTECTED)

router.post("/sync",syncUser);

//requireAuth() is a clerk method , used to protect this router , if user isn't authentiicated, they can't call next() 
//deprecated
export default router;