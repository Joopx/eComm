import dotenv from "dotenv";


dotenv.config({quiet:true});

const required = ["DB_URL", "CLERK_SECRET_KEY", "CLERK_PUBLISHABLE_KEY"] as const;

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`${key} is not set in environment variables`);
    }
}

export const ENV = {
    PORT : process.env.PORT || "5000",
    DB_URL : process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY!,
    CLERK_SECRET_KEY : process.env.CLERK_SECRET_KEY!
}