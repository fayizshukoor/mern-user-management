import app from "./src/app.js";
import dotenv from 'dotenv';
import connectDatabase from "./src/config/database.config.js";
dotenv.config();

const port = process.env.PORT || 5000;

connectDatabase().then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`);
    })
})
