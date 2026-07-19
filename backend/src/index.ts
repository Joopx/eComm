import express from "express";
import {ENV} from "./config/env"
import {clerkMiddleware} from "@clerk/express";
import cors from "cors";
import { User } from "./db/schema";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes//commentRoutes";


const app = express();


//credentials true allows the frontend to send cookies to the backend so that we can authenticate the user.
app.use(cors({origin:ENV.FRONTEND_URL, credentials:true}));
app.use(clerkMiddleware()); // auth obj will be attched to the req
app.use(express.json()); //parses JSON req bodies
app.use(express.urlencoded({extended:true})); // parses form data(html forms)

app.get("/", (req,res)=>{

     
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

app.listen(ENV.PORT,()=>
    console.log(`Listening on Port:${ENV.PORT}`));