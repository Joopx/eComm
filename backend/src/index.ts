import express from "express";
import {ENV} from "./config/env"
import path from "path"
import {clerkMiddleware} from "@clerk/express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";
import { Request,Response } from "express";
const app = express();


//credentials true allows the frontend to send cookies to the backend so that we can authenticate the user.
app.use(cors({origin:ENV.FRONTEND_URL, credentials:true}));
app.use(clerkMiddleware()); // auth obj will be attched to the req
app.use(express.json()); //parses JSON req bodies
app.use(express.urlencoded({extended:true})); // parses form data(html forms)

app.get("/api/health", (req:Request,res:Response)=>{

     
    res.json({
        message: "Welcom to ecomm API done using PERN stack",
        endpoints:{
            users: '/api/users',
            products: '/api/products',
            comments: '/api/comments',
        },
    });
});


app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/comments",commentRoutes);


if(ENV.NODE_ENV === "production"){
    const frontendDist = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendDist));

    app.get("/{*any}",(_req,res)=>{
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}
app.listen(ENV.PORT,()=>
    console.log(`Listening on Port:${ENV.PORT}`));