import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const url = process.env.MONGO_URL;

const database = {
    async connect() {
        try {
            await mongoose.connect(url)
            console.log("connect to database successful")
        } catch (error) {
            console.log("connect to database failed")
        }
    }
};

export default database;