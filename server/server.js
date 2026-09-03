import "dotenv/config";
import app from "./src/app.js";
import connectDatabase from "./src/config/database.config.js";

const port = process.env.PORT || 5000;

connectDatabase().then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`);
    })
})
