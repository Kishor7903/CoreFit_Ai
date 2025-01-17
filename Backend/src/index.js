import app from "../src/app.js";
import dotenv from "dotenv";
import connectDB from "./config/db-connecton.js";

dotenv.config({
    path: "./.env",
})

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server listening on port " + process.env.PORT);
    })
}).catch((e) => {
    console.log("Server Crashed: ", e.message);
})