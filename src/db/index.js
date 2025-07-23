const mongoose = require("mongoose");
// const { DB_NAME } = require("../constants");

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB connected!! DB Host: ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb connection error", error);
        process.exit(1);
    }
};

module.exports = connectDB;
