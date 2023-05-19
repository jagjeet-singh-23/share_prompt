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
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "share_prompt"
        });
        isConnected = true;
        console.log('Mongoose Connected to database');
    } catch (error) {
        console.log(error);
    }
}