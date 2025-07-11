import mongoose from "mongoose";

const connect = async (): Promise<void> => {
    const dbUri = process.env.MONGO_URI;
    try {
        await mongoose.connect(dbUri || "");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
});

export default connect;
