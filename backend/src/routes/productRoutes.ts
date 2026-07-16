import { Router } from "express";
import * as productController from "../controllers/productController";



const router = Router();

//GET /api/products => get all the products(public), withouth authentication you should be able to access

router.get("/",productController.getAllProducts);
router.get("/my",productController.getMyProducts);
router.get("/:id",productController.getProductById);
router.post("/",productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id",productController.deleteProduct);

export default router;