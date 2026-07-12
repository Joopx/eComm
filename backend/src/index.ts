import express from "express";
import {ENV} from "./config/env"
import {clerkMiddleware} from "@clerk/express";
import cors from "cors";

const app = express();

app.use(cors({origin:ENV.FRONTEND_URL}));
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

app.listen(ENV.PORT,()=>
    console.log(`Listening on Port:${ENV.PORT}`));