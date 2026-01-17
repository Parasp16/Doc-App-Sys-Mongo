const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected !")
    } catch (error) {
        console.error("MongoDB connection failed:",error.message);
        process.exit(1);
    }
}
connectDB();