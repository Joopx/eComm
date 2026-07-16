import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";
import { error } from "node:console";
import { desc } from "drizzle-orm";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error getting products", err);
    res.status(500).json({
      error: "Failed to get products ",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(
      Array.isArray(id) ? id[0] : id,
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    console.error("Error getting products", err);
    res.status(500).json({
      error: "Failed to get products",
    });
  }
};

//get products by current user(PROTECTED)
export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting user products:", error);
    res.status(500).json({ error: "Failed to get user products" });
  }
};

//create product (PROTECTED)

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, imageUrl } = req.body;

    if (!title || description || imageUrl) {
      res
        .status(400)
        .json({ error: " Title, description and imageUrl are required" });
      return;
    }

    const product = await queries.createProduct({
      title: title,
      description,
      imageUrl,
      userId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error getting user products:", error);
    res.status(500).json({ error: "Failed to get user products" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({
        error: "Unauthorized",
      });

    const { id } = req.params;
    //chech later
    const productId = Array.isArray(id) ? id[0] : id;
    const { title, description, imageUrl } = req.body;

    //Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(productId);
    if (!existingProduct) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }
    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "you can only update your own products" });
      return;
    }

    const product = await queries.updateProduct(productId, {
      title,
      description,
      imageUrl,
    });

    res.status(200).json(product);
  } catch (err) {
    console.error("error updating product: ", err);
    res.status(500).json({
      error: "Failed to update product.",
    });
  }
};


//delete product (protected - owner only)

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({
        error: "Unauthorized",
      });

    const { id } = req.params;
    

    //Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(Array.isArray(id) ? id[0] : id);
    if (!existingProduct) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }
    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "you can only delete your own products" });
      return;
    }

    await queries.deleteProduct(Array.isArray(id) ? id[0] : id);
    res.status(200).json({message: "product deleted successfully"});
  } catch (err) {
    console.error("error deleting product: ", err);
    res.status(500).json({
      error: "Failed to delete product.",
    });
  }
};