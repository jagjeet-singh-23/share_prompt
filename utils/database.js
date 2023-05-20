import mongoose from "mongoose";

let isConnected = false;

export const ConnectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('Mongoose Already Connected to database');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Mongoose Connected to database');
    } catch (error) {
        console.log(error);
    }
}