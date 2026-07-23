import type { Request,Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export async function  syncUser(req:Request, res:Response) {
    try{
        const {userId} = getAuth(req)
        if(!userId) return res.status(401).json({
            error: "Unauthorized"
        })
        const {email, name, imageUrl} = req.body;
        if(!email){
            return res.status(400).json({ error: "email is required" });
        }
       const user = await queries.upsertUser({
            id: userId,
            email,
            name: name || "User",
            imageUrl: imageUrl || "",
        })
        res.status(200).json(user);
    }catch(err){
        console.log("error syncing user:" , err)
        res.status(500).json({error: "failed to sync user "})
    }
}