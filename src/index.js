// index.js (your main entry file)
const dotenv = require('dotenv');
dotenv.config({ path: './.env' }); // or just dotenv.config() if using .env
const app = require("./app.js")
const connectDB = require('./db/index');

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed: ", err);

    })


/*
import express from "express"
const app = express()

    ; (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on("errror: ", (error) => {
                console.log("ERRR: ", error);
                throw error
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port: ${process.env.PORT}`);

            })
        }
        catch (error) {
            console.log("Error: ", error);
            throw err

        }
    })()
*/