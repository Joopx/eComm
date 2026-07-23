import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import * as schema from "./schema";
import {ENV} from "../config/env";


if(!ENV.DB_URL){
    throw new Error("DB_URL is not set in environment variables");
}


//init psql connection pool 

const pool = new Pool({connectionString:ENV.DB_URL});


//log when firs conn is made

pool.on("connect",()=>{
    console.log("Database connected successfully")
});

pool.on("error",(err)=>{
    console.error(" Database connection error:", err);
})

export const db = drizzle({client : pool, schema});

//conn pool is a cache of db connections that are kept open and reused . to avoid slowness and limited connections, by default its 10 to increase -> ,max...


